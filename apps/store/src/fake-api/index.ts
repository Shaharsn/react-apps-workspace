const games = [
  {
    id: 'Settlers-in-the-can',
    name: 'Settlers in the Can',
    image: '/assets/settlers.jpg',
    description: 'Help your bug family claim the best real estate',
    price: 10,
    rating: Math.random(),
  },{
    id: 'chess-pie',
    name: 'Chess Pie',
    image: '/assets/chess-pie.jpg',
    description: 'A circular pie chart',
    price: 15,
    rating: Math.random(),
  },
  {
    id: 'purrfection',
    name: 'Purrfection',
    image: '/assets/cat.jpg',
    description: 'A cat grooming contest goes wrong',
    price: 45,
    rating: Math.random(),
  },
];

export const getAllGames = () => games;
export const getGame = (id: string) => games.find((game) => game.id === id);
