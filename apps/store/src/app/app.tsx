// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { getAllGames } from '../fake-api';

import { Header } from '@react-apps-workspace/store/ui-shared';
import { formatRating } from '@react-apps-workspace/store/util-formatters';

import Card from '@material-ui/core/Card';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

export const App = () => {
  return (
    <>
      {' '}
      <Header />
      <div className={styles['container']}>
        <div className={styles['games-layout']}>
          {getAllGames().map((game) => (
            <Card key={game.id} className={styles['game-card']}>
              <CardActionArea>
                <CardMedia
                  className={styles['game-card-media']}
                  image={game.image}
                  title={game.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {game.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {game.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={styles['game-rating']}
                  >
                    <strong>Rating:</strong> {formatRating(game.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
