<template>
	<div
		class="speech-synthesis-player"
		:class="`speech-synthesis-player--theme-${theme}`"
	>
		<div class="speech-synthesis-player__inner">
			<div class="speech-synthesis-player__caption fw-700">
				Прослушать текст
			</div>
			<div
				class="speech-synthesis-player__control speech-synthesis-player__btn"
				@click="playpause"
			>
				<SvgIcon
					class="speech-synthesis-player__control-icon"
					:icon="controlIcon"
				/>
			</div>
			<div class="speech-synthesis-player__volume">
				<div
					class="speech-synthesis-player__volume-btn speech-synthesis-player__btn"
					:class="{ 'speech-synthesis-player__disabled': isSpeaking }"
					@click="setStateVisibleVolumeWindow(!isVisibleVolumeWindow)"
				>
					<SvgIcon
						class="speech-synthesis-player__volume-icon"
						icon="volume"
					/>
				</div>
				<div
					class="speech-synthesis-player__window"
					:class="{ 'speech-synthesis-player__window--is-visible': isVisibleVolumeWindow && !isSpeaking }"
				>
					<div class="speech-synthesis-player__window-inner">
						<div class="speech-synthesis-player__volume-window">
							<CustomSingleRange
								v-model="volumeModel"
								:range="{ from: 0, to: 100 }"
							/>
							<div class="speech-synthesis-player__volume-value fw-600">
								{{ roundVolumeModel }}%
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="speech-synthesis-player__rate">
				<div
					class="speech-synthesis-player__rate-btn speech-synthesis-player__btn fw-600"
					:class="{ 'speech-synthesis-player__disabled': isSpeaking }"
					@click="setStateVisibleRateWindow(!isVisibleRateWindow)"
				>
					<span>{{ rate }}x</span>
					<SvgIcon
						class="speech-synthesis-player__rate-icon"
						icon="chevron-down"
					/>
				</div>
				<div
					class="speech-synthesis-player__window"
					:class="{ 'speech-synthesis-player__window--is-visible': isVisibleRateWindow && !isSpeaking }"
				>
					<div class="speech-synthesis-player__window-inner">
						<div class="speech-synthesis-player__rate-window">
							<div class="speech-synthesis-player__rate-list">
								<div
									v-for="item in rateList"
									:key="`rate-${item.rate}`"
									class="speech-synthesis-player__rate-value"
									:class="{ 'speech-synthesis-player__rate-value--is-active': item.rate === rate }"
									@click="selectRate(item.rate)"
								>
									{{ item.rate }}x
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="speech-synthesis-player__progress">
				<div
					class="speech-synthesis-player__progress-line"
					:style="progressLineStyle"
				/>
				<div class="speech-synthesis-player__progress-numbers">
					<div class="speech-synthesis-player__number">
						{{ formattedElepsedTime }}
					</div>
					<div class="speech-synthesis-player__number">
						{{ formattedFullTime }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AllBaseColors } from '~/types/common/Themes'
import { numberAsString } from '@/helpers/formatHelper'

interface RateItem {
	rate: number
	timeSpeedCoef: number
	timeSpeedCoefAndroind: number
}

const props = withDefaults(defineProps<{ text: string, theme?: AllBaseColors }>(), {
	theme: AllBaseColors.PRIMARY,
})

const speechtext = ref('')
const rate = ref(1)
const isSpeaking = ref(false)
const timeSpeedCoef = ref(13) // примерная скорость чтения робота, полученая опытным путем, символов в секунду
const utterance = ref<SpeechSynthesisUtterance | null>(null)
const boundaryIndex = ref(0)
const boundaryText = ref('')
const canStop = ref(false)
const volumeModel = ref(100)
const isVisibleVolumeWindow = ref(false)
const isVisibleRateWindow = ref(false)
const intervalId = ref<NodeJS.Timeout | null>(null)
const fakeBoundaryEnabled = ref(true)
const ruLangRegex = /ru |ru-|ru_|ru&|ru\//
const voice = ref<SpeechSynthesisVoice | null>(null)

const rateList = ref<RateItem[]>([
	{
		rate: 0.8,
		timeSpeedCoef: timeSpeedCoef.value,
		timeSpeedCoefAndroind: 12.4,
	},
	{
		rate: 1,
		timeSpeedCoef: timeSpeedCoef.value,
		timeSpeedCoefAndroind: 14.2,
	},
	{
		rate: 1.2,
		timeSpeedCoef: timeSpeedCoef.value,
		timeSpeedCoefAndroind: 16.2,
	},
	{
		rate: 1.5,
		timeSpeedCoef: timeSpeedCoef.value,
		timeSpeedCoefAndroind: 18.2,
	},
])

const listeningTime = computed(() => {
	return Math.floor(speechtext.value.length / timeSpeedCoef.value)
})

const remainingListeningTime = computed(() => {
	const remainingText = boundaryText.value.substring(boundaryIndex.value)
	return Math.floor(remainingText.length / timeSpeedCoef.value)
})

const formattedFullTime = computed(() => {
	return getFormattedTime(listeningTime.value)
})

const formattedElepsedTime = computed(() => {
	return getFormattedTime(listeningTime.value - remainingListeningTime.value)
})

const elapsedTimePercentage = computed(() => {
	const delta = listeningTime.value - remainingListeningTime.value
	return (delta * 100) / listeningTime.value
})

const progressLineStyle = computed(() => {
	return {
		'--progress-percent': `${elapsedTimePercentage.value}%`,
	}
})

const controlIcon = computed(() => {
	return isSpeaking.value ? 'pause-circle' : 'play-circle'
})

const volume = computed(() => {
	return volumeModel.value / 100
})

const roundVolumeModel = computed(() => {
	return Math.round(volumeModel.value)
})

const getConvertedText = (text: string) => {
	const div = document.createElement('div')
	div.innerHTML = text

	// удяляются блоки, которые не требуются в озвучке - таблицы, видео и тд
	div?.querySelectorAll('table, video, img, iframe')?.forEach(block => block?.remove())

	return div?.textContent
}

const updateTextToSpeak = () => {
	const textToSpeak = getConvertedText(props.text)

	if (textToSpeak) {
		speechtext.value = textToSpeak

		if (!boundaryText.value) {
			boundaryText.value = textToSpeak
		}
	}
}

const loadVoice = () => {
	const voices = window.speechSynthesis.getVoices()

	if (!voices?.length) {
		return
	}

	const ruVoices = voices.filter(voice => ruLangRegex.test(voice.lang))
	const voiceMain = voices.find(voice => ruLangRegex.test(voice.lang) && voice?.name?.toLowerCase()?.includes('pavel'))
	const voiceSecondary = ruVoices?.[0]

	if (voiceMain || voiceSecondary) {
		voice.value = voiceMain || voiceSecondary
	}
}

const stop = (withClear = false) => {
	speechSynthesis.cancel()
	if (intervalId.value) {
		clearInterval(intervalId.value)
		intervalId.value = null
	}

	if (withClear) {
		boundaryIndex.value = 0
		boundaryText.value = speechtext.value
	}
}

const playpause = () => {
	if (!isSpeaking.value) {
		isSpeaking.value = true
		speak()
	}
	else if (isSpeaking.value) {
		if (fakeBoundaryEnabled.value) {
			pauseHandler()
		}
		else {
			isSpeaking.value = false
		}

		if (intervalId.value) {
			clearInterval(intervalId.value)
			intervalId.value = null
		}
		speechSynthesis.pause()
	}
	else {
		isSpeaking.value = true
		speak()
	}
}

const updateUtterance = () => {
	utterance.value = new SpeechSynthesisUtterance(boundaryText.value)
	utterance.value.voice = voice.value
	utterance.value.volume = volume.value
	utterance.value.pitch = 1
	utterance.value.rate = rate.value

	utterance.value.addEventListener('start', handleSpeechEvent)
	utterance.value.addEventListener('end', handleSpeechEvent)
	utterance.value.addEventListener('error', handleSpeechEvent)
	utterance.value.addEventListener('pause', handleSpeechEvent)
	utterance.value.addEventListener('resume', handleSpeechEvent)
	utterance.value.addEventListener('boundary', handleSpeechEvent)
}

const startFakeBoundary = () => {
	if (!fakeBoundaryEnabled.value) {
		return
	}

	const timeSpeedByCurrentRate = rateList.value.find(item => item.rate === rate.value)?.timeSpeedCoefAndroind || 14.2
	const timeTick = 1000
	const timeDelta = (timeTick * timeSpeedByCurrentRate / timeSpeedCoef.value) - timeTick

	intervalId.value = setInterval(() => {
		const boundaryIndexValue = boundaryIndex.value + Math.trunc(timeSpeedCoef.value)

		fakeBoundary(Math.min(boundaryIndexValue, boundaryText.value?.length))
	}, timeTick - timeDelta)
}

const fakeBoundary = (charIndex: number) => {
	handleSpeechEvent({
		type: 'boundary',
		charIndex,
		isFake: true,
	})
}

const speak = () => {
	stop()

	updateTextToSpeak()
	loadVoice()
	updateUtterance()

	if (utterance.value) {
		speechSynthesis.speak(utterance.value)
	}
}

const handleSpeechEvent = (e: SpeechSynthesisEvent | { type: string, charIndex: number, isFake?: boolean }) => {
	switch (e.type) {
		case 'start':
		case 'resume':
			if (fakeBoundaryEnabled.value) {
				startFakeBoundary()
			}

			isSpeaking.value = true
			canStop.value = true
			break
		case 'error':
		case 'end':
		case 'endEvent':
			if (canStop.value) {
				stop(true)
			}

			isSpeaking.value = false
			break
		case 'pause':
			pauseHandler()
			break
		case 'boundary':
			if (!('isFake' in e) || !e.isFake) {
				fakeBoundaryEnabled.value = false
				if (intervalId.value) {
					clearInterval(intervalId.value)
					intervalId.value = null
				}
			}

			boundaryIndex.value = e.charIndex
			break
		default:
			break
	}
}

const pauseHandler = () => {
	canStop.value = false
	stop()
	isSpeaking.value = false
	boundaryText.value = boundaryText.value.substring(boundaryIndex.value)
	boundaryIndex.value = 0
}

const onBeforeunload = () => {
	stop(true)
}

const getFormattedTime = (time: number) => {
	const m = time >= 60 ? Math.trunc(time / 60) : 0
	const s = time - (Math.trunc(m) * 60)

	return `${numberAsString(m)}:${numberAsString(s)}`
}

const setStateVisibleVolumeWindow = (state: boolean) => {
	isVisibleVolumeWindow.value = state
}

const setStateVisibleRateWindow = (state: boolean) => {
	isVisibleRateWindow.value = state
}

const selectRate = (selectedRate: number) => {
	rate.value = selectedRate
	setStateVisibleRateWindow(false)
}

const closeFromClickoutHelper = (e: MouseEvent, className: string, fnCallback: () => void) => {
	const el = (e.target as HTMLElement).closest(`.${className}`)

	if (!((e.target as HTMLElement).classList.contains(className) || el) && fnCallback) {
		fnCallback()
	}
}

const closeFromClickout = (e: MouseEvent) => {
	closeFromClickoutHelper(e, 'speech-synthesis-player__volume', () => setStateVisibleVolumeWindow(false))
	closeFromClickoutHelper(e, 'speech-synthesis-player__rate', () => setStateVisibleRateWindow(false))
}

onMounted(() => {
	updateTextToSpeak()
	loadVoice()

	if (speechSynthesis.onvoiceschanged) {
		speechSynthesis.onvoiceschanged = loadVoice
	}

	window.addEventListener('beforeunload', onBeforeunload)
	window.addEventListener('mousedown', closeFromClickout)
})

onBeforeUnmount(() => {
	stop()

	window.removeEventListener('beforeunload', onBeforeunload)
	window.removeEventListener('mousedown', closeFromClickout)
})
</script>

<style lang="scss">
$b: '.speech-synthesis-player';

#{$b} {
	--theme-color: transparent;
	--text-color: #{$color-light};
	--text-color-2: #{$color-secondary};

	// .speech-synthesis-player--theme-light
	&--theme-light {
		--theme-color: #{$color-light};
		--text-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-light-2
	&--theme-light-2 {
		--theme-color: #{$color-light-2};
		--text-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-secondary
	&--theme-secondary {
		--theme-color: #{$color-secondary};
		--text-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-secondary-2
	&--theme-secondary-2 {
		--theme-color: #{$color-secondary-2};
		--text-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-secondary-3
	&--theme-secondary-3 {
		--theme-color: #{$color-secondary-3};
		--text-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-main
	&--theme-main {
		--theme-color: #{$color-main};
  }

	// .speech-synthesis-player--theme-main-light
	&--theme-main-light {
		--theme-color: #{$color-main-light};
  }

	// .speech-synthesis-player--theme-dark
	&--theme-dark {
		--theme-color: #{$color-dark};
  }

  // .speech-synthesis-player--theme-danger
  &--theme-danger {
		--theme-color: #{$color-danger};
  }

	// .speech-synthesis-player--theme-warning
	&--theme-warning {
		--theme-color: #{$color-warning};
  }

	// .speech-synthesis-player--theme-success
	&--theme-success {
		--theme-color: #{$color-success};
  }

	// .speech-synthesis-player--theme-darksuccess
	&--theme-dark-success {
		--theme-color: #{$color-dark-success};
  }

  // .speech-synthesis-player--theme-primary
  &--theme-primary {
		--theme-color: #{$color-primary};
  }

  // .speech-synthesis-player--theme-primary-accent
  &--theme-primary-accent {
		--theme-color: #{$color-primary-accent};
  }

  // .speech-synthesis-player__btn
  &__btn {
    cursor: pointer;

    @include hover {
      opacity: 0.75;
    }
  }

  // .speech-synthesis-player__inner
  &__inner {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    min-height: 74px;
    border-radius: 16px;
    background-color: var(--theme-color);

    @include mobile {
      position: relative;
      display: grid;
      grid-template-columns: auto 40px;
      gap: 28px 0;
      padding: 16px;
    }
  }

  // .speech-synthesis-player__caption
  &__caption {
    padding-right: 8px;
    white-space: nowrap;
		color: var(--text-color);
  }

  // .speech-synthesis-player__control
  &__control {
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-color);

    @include boxsize(40px);

    @include mobile {
      position: absolute;
      bottom: 16px;
      left: 16px;
      z-index: 2;
    }
  }

  // .speech-synthesis-player__volume
  &__volume {
    position: relative;

    @include mobile {
      display: none;

      #{$b}__window {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        transform: translateY(-100%);

        &::after {
          left: unset;
          transform: none;
          right: 68px;
        }
      }
    }

    // .speech-synthesis-player__volume-btn
    &-btn {
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.3s ease;

      @include boxsize(24px);
    }

    // .speech-synthesis-player__volume-value
    &-value {
      font-size: 9px;
      line-height: normal;
      text-align: right;
    }

    // .speech-synthesis-player__volume-window
    &-window {
      display: grid;
      grid-template-columns: 120px 36px;
      gap: 16px;
      align-items: center;

      @include mobile {
        grid-template-columns: auto 36px;
      }
    }
  }

  // .speech-synthesis-player__rate
  &__rate {
    position: relative;

    // .speech-synthesis-player__rate-btn
    &-btn {
      min-width: 40px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 14px;
      line-height: normal;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-color);

      @include mobile {
        width: 100%;
        justify-content: flex-end;
      }
    }

    #{$b}__rate-icon {
      width: 8px;
      height: 8px;
    }

    // .speech-synthesis-player__rate-value
    &-value {
      width: 64px;
      height: 24px;
      display: flex;
      align-self: center;
      justify-content: center;
      text-align: center;
      font-size: 12px;
      line-height: normal;
      font-weight: 600;
      opacity: 0.5;
      cursor: pointer;
      transition: all 0.3s ease;

      @include hover {
        opacity: 0.75;
      }

      // .speech-synthesis-player__rate-value--is-active
      &--is-active {
        opacity: 1;
      }
    }
  }

  // .speech-synthesis-player__progress
  &__progress {
    width: 100%;
    position: relative;

    @include mobile {
      grid-column-start: 1;
      grid-column-end: 3;
      padding-left: 56px;
    }

    // .speech-synthesis-player__progress-line
    &-line {
      position: relative;
      overflow: hidden;
      height: 8px;
      width: 100%;
			background-color: $color-dark;
      border-radius: 8px;
			box-shadow: 0 0 1px 0 var(--text-color);

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        max-width: var(--progress-percent, 0);
        transition: all 0.1s linear;
				background-color: $color-light;
      }
    }

    // .speech-synthesis-player__progress-numbers
    &-numbers {
      position: absolute;
      top: calc(100% + 4px);
      width: 100%;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-color);
      font-size: 12px;
      line-height: normal;

      @include mobile {
        position: static;
        margin-top: 4px;
      }
    }
  }

  // .speech-synthesis-player__window
  &__window {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateY(-100%) translateX(-50%);
    transition: all 0.3s ease;
    z-index: 3;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-top: 8px solid $color-dark;
    }

    &:not(#{$b}__window--is-visible) {
      opacity: 0;
      pointer-events: none;
      touch-action: none;
      top: -50px;
    }

    // .speech-synthesis-player__window-inner
    &-inner {
			position: relative;
      padding: 8px;
      border-radius: 4px;
      background-color: $color-dark;
      color: $color-light;

			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				touch-action: none;
				box-shadow: 0 0 30px 0 var(--theme-color);
				opacity: 0.4;
			}
    }
  }

  // .speech-synthesis-player__disabled
  &__disabled {
    pointer-events: none;
    touch-action: none;
    opacity: 0.5;
  }
}
</style>
