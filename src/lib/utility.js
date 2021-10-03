export const getRandomElement = (array, length) => {
    return array[Math.floor(Math.random() * length)]
}

export const randomBetween = (min, max) => {
    return (Math.random() * (max - min) + min)
}