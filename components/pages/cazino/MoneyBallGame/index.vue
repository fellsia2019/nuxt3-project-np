<template>
	<div class="money-ball-game">
		<div class="money-ball-game__frame">
			<canvas ref="canvas" />
		</div>
		<div class="money-ball-game__actions">
			<CustomButton
				class="money-ball-game__btn"
				@click="start"
			>
				Старт
			</CustomButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
const canvas = ref<null | HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D | null>(null)
const gameActive = ref(false)
const animationFrameId = ref<number>()

interface Ball {
	x: number
	y: number
	radius: number
	dy: number
	dx: number
	color: string
}

interface Obstacle {
	x: number
	y: number
	radius: number
}

interface Hole {
	x: number
	width: number
	weight: number // Вес вероятности попадания
}

interface Boundary {
	x1: number
	y1: number
	x2: number
	y2: number
}

const SCENE = {
	startY: 150,
	rowHeight: 100,
	baseRadius: 10,
	xSpacing: 2.8,
	boundaries: {
		topOffset: 100, // Увеличен отступ сверху
		baseMargin: 90, // Увеличен отступ от основания
		visualOffset: 10, // Визуальный отступ для линий
	},
	// Вероятности попадания для каждой лунки (сумма = 1)
	holeProbabilities: [0.3, 0.15, 0.05, 0.05, 0.15, 0.3],
}

const holes = ref<Hole[]>([])
const boundaries = ref<Boundary[]>([])
const ball = ref<Ball>({
	x: 0,
	y: 0,
	radius: 15,
	dy: 0,
	dx: 0,
	color: '#ff0000',
})

const obstacles = ref<Obstacle[]>([])

// Функция создания лунок с весами
function createHoles() {
	const holeCount = 6
	const holeWidth = 80
	const totalHolesWidth = holeCount * holeWidth
	const startX = (canvas.value!.width - totalHolesWidth) / 2

	holes.value = Array.from({ length: holeCount }, (_, i) => ({
		x: startX + i * holeWidth,
		width: holeWidth,
		weight: SCENE.holeProbabilities[i] || 0,
	}))
}

// Функция для выбора лунки по весам
function getWeightedRandomHole(): number {
	const totalWeight = holes.value.reduce((sum, hole) => sum + hole.weight, 0)
	const random = Math.random() * totalWeight
	let cumulative = 0

	for (let i = 0; i < holes.value.length; i++) {
		cumulative += holes.value[i].weight
		if (random < cumulative) {
			return i
		}
	}
	return Math.floor(holes.value.length / 2) // fallback на центральную
}

// Функция создания наклонных границ
// В функции createBoundaries() заменяем на:
function createBoundaries() {
	const baseRow = obstacles.value.filter(o => Math.abs(o.y - (SCENE.startY + 4 * SCENE.rowHeight)) < 1)
	if (baseRow.length < 7) return

	const leftBaseX = baseRow[0].x - baseRow[0].radius
	const rightBaseX = baseRow[6].x + baseRow[6].radius
	const baseY = baseRow[0].y
	const topCenter = (canvas.value!.width) / 2

	boundaries.value = [
		// Левая граница
		{
			x1: topCenter - SCENE.boundaries.topOffset,
			y1: 50,
			x2: leftBaseX - SCENE.boundaries.baseMargin,
			y2: baseY,
		},
		// Правая граница
		{
			x1: topCenter + SCENE.boundaries.topOffset,
			y1: 50,
			x2: rightBaseX + SCENE.boundaries.baseMargin,
			y2: baseY,
		},
	]
}

function createScene() {
	obstacles.value = []
	const rows = [3, 4, 5, 6, 7]
	const baseRadius = 10
	const xSpacing = 2.8 // Уменьшили множитель для меньшего разброса

	rows.forEach((count, rowIndex) => {
		const y = 150 + rowIndex * 100
		const diameter = baseRadius * 2
		const totalWidth = (count - 1) * diameter * xSpacing
		const startX = (canvas.value!.width - totalWidth) / 2 + baseRadius

		for (let i = 0; i < count; i++) {
			obstacles.value.push({
				x: startX + i * diameter * xSpacing,
				y: y,
				radius: baseRadius,
			})
		}
	})
}

function createBall() {
	const targetHoleIndex = getWeightedRandomHole()
	const targetHole = holes.value[targetHoleIndex]

	// Стартуем по центру, но задаем начальный импульс в сторону целевой лунки
	const centerX = canvas.value!.width / 2
	const targetX = targetHole.x + targetHole.width / 2
	const direction = targetX > centerX ? 1 : -1

	ball.value = {
		x: centerX,
		y: 50,
		radius: 15,
		dy: 0,
		dx: direction * (0.5 + Math.random() * 1.5), // Импульс в сторону цели
		color: '#ff0000',
	}

	console.log(`Целевая лунка: ${targetHoleIndex + 1} (шанс: ${(targetHole.weight * 100).toFixed(1)}%)`)
}

// Функция проверки коллизии с линией
function checkLineCollision(line: Boundary) {
	// Упрощенная проверка коллизии шара с линией
	const { x, y, radius } = ball.value
	const { x1, y1, x2, y2 } = line

	// Вектор линии
	const lineVecX = x2 - x1
	const lineVecY = y2 - y1

	// Вектор от точки до шара
	const pointToBallX = x - x1
	const pointToBallY = y - y1

	// Длина линии
	const lineLength = Math.sqrt(lineVecX * lineVecX + lineVecY * lineVecY)

	// Проекция вектора на линию
	const projection = (pointToBallX * lineVecX + pointToBallY * lineVecY) / (lineLength * lineLength)

	// Ближайшая точка на линии
	let closestX, closestY
	if (projection < 0) {
		closestX = x1
		closestY = y1
	}
	else if (projection > 1) {
		closestX = x2
		closestY = y2
	}
	else {
		closestX = x1 + projection * lineVecX
		closestY = y1 + projection * lineVecY
	}

	// Расстояние до линии
	const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2)

	if (distance < radius) {
		// Нормаль столкновения
		const nx = (x - closestX) / distance
		const ny = (y - closestY) / distance

		// Коррекция позиции
		const penetration = radius - distance
		ball.value.x += nx * penetration
		ball.value.y += ny * penetration

		// Отражение скорости
		const dotProduct = ball.value.dx * nx + ball.value.dy * ny
		ball.value.dx -= 2 * dotProduct * nx * 0.7
		ball.value.dy -= 2 * dotProduct * ny * 0.7
	}
}

function update() {
	if (!gameActive.value) return

	// Гравитация с ограничением максимальной скорости
	ball.value.dy = Math.min(ball.value.dy + 0.2, 15)
	ball.value.y += ball.value.dy
	ball.value.x += ball.value.dx

	// Проверка коллизий с границами
	boundaries.value.forEach((boundary) => {
		checkLineCollision(boundary)
	})

	// Проверка попадания в лунку (центрированная проверка)
	if (ball.value.y + ball.value.radius > canvas.value!.height - 20) {
		const ballCenter = ball.value.x
		for (const hole of holes.value) {
			const holeCenter = hole.x + hole.width / 2
			if (ballCenter > holeCenter - hole.width / 2 && ballCenter < holeCenter + hole.width / 2) {
				endGame(`Попал в лунку ${holes.value.indexOf(hole) + 1}`)
				return
			}
		}

		// Отскок от пола
		ball.value.y = canvas.value!.height - ball.value.radius - 20
		ball.value.dy *= -0.5
		ball.value.dx *= 0.7
	}

	// Столкновение со стенами
	if (ball.value.x - ball.value.radius < 0 || ball.value.x + ball.value.radius > canvas.value!.width) {
		ball.value.dx *= -0.7
		ball.value.x = Math.max(ball.value.radius, Math.min(canvas.value!.width - ball.value.radius, ball.value.x))
	}

	// Проверка коллизий с препятствиями
	obstacles.value.forEach((obstacle) => {
		const dx = ball.value.x - obstacle.x
		const dy = ball.value.y - obstacle.y
		const distance = Math.sqrt(dx * dx + dy * dy)
		const minDistance = ball.value.radius + obstacle.radius

		if (distance < minDistance) {
			// Нормаль столкновения
			const nx = dx / distance
			const ny = dy / distance

			// Коррекция позиции
			const penetration = minDistance - distance
			ball.value.x += nx * penetration
			ball.value.y += ny * penetration

			// Скорость относительно нормали
			const velocityAlongNormal = ball.value.dx * nx + ball.value.dy * ny

			// Только если объекты сближаются
			if (velocityAlongNormal > 0) return

			// Уменьшенный коэффициент упругости
			const restitution = 0.7

			// Импульс отталкивания
			const impulse = -(1 + restitution) * velocityAlongNormal

			// Применяем импульс с уменьшенной силой
			ball.value.dx += impulse * nx * 0.7
			ball.value.dy += impulse * ny * 0.7

			// Добавляем небольшое случайное отклонение
			ball.value.dx += (Math.random() - 0.5) * 0.5
		}
	})

	// Увеличенное трение для быстрой остановки
	ball.value.dx *= 0.99
	ball.value.dy *= 0.99
}

function endGame(message: string) {
	console.log(message)
	gameActive.value = false
	if (animationFrameId.value) {
		cancelAnimationFrame(animationFrameId.value)
	}
}

function gameLoop() {
	update()
	draw()
	if (gameActive.value) {
		animationFrameId.value = requestAnimationFrame(gameLoop)
	}
}

function initGame() {
	createScene()
	createBoundaries() // Создаем границы
	gameActive.value = true
	gameLoop()
}

function draw() {
	if (!ctx.value || !canvas.value) return

	ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

	// Рисуем границы с визуальным отступом
	ctx.value.strokeStyle = 'rgba(100, 100, 100, 0.7)'
	ctx.value.lineWidth = 4
	boundaries.value.forEach((boundary) => {
		if (!ctx.value || !canvas.value) return

		// Визуальные линии (с отступом)
		const visualX1 = boundary.x1 + (boundary.x1 < canvas.value!.width / 2 ? SCENE.boundaries.visualOffset : -SCENE.boundaries.visualOffset)
		const visualX2 = boundary.x2 + (boundary.x2 < canvas.value!.width / 2 ? SCENE.boundaries.visualOffset : -SCENE.boundaries.visualOffset)

		ctx.value.beginPath()
		ctx.value.moveTo(visualX1, boundary.y1)
		ctx.value.lineTo(visualX2, boundary.y2)
		ctx.value.stroke()
	})

	// Рисуем лунки
	ctx.value.fillStyle = '#333'
	holes.value.forEach((hole) => {
		if (!ctx.value || !canvas.value) return

		ctx.value.beginPath()
		ctx.value.arc(hole.x + hole.width / 2, canvas.value!.height - 10, hole.width / 2, Math.PI, 0)
		ctx.value.fill()
	})

	// Рисуем шарик
	ctx.value.beginPath()
	ctx.value.arc(ball.value.x, ball.value.y, ball.value.radius, 0, Math.PI * 2)
	ctx.value.fillStyle = ball.value.color
	ctx.value.fill()

	// Рисуем препятствия
	ctx.value.fillStyle = '#0000ff'
	obstacles.value.forEach((obstacle) => {
		if (!ctx.value || !canvas.value) return

		ctx.value.beginPath()
		ctx.value.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2)
		ctx.value.fill()
	})
}

function start() {
	createHoles()
	createBall()
	initGame()
}

onMounted(() => {
	if (!canvas.value) return
	canvas.value.width = 800
	canvas.value.height = 600
	ctx.value = canvas.value.getContext('2d')
})

onUnmounted(() => {
	if (animationFrameId.value) {
		cancelAnimationFrame(animationFrameId.value)
	}
})
</script>
