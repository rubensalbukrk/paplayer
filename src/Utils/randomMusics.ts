export default function getRandomMusic<T>(arr: T[], num: number): T[] {
    const shuffled = arr.sort(() => 0.3 - Math.random());
    return shuffled.slice(0, num);
  }

