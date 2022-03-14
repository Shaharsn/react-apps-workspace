// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Game } from "libs/api/util-interfaces/src";

import { Header } from '@react-apps-workspace/store/ui-shared';
import { formatRating } from '@react-apps-workspace/store/util-formatters';

import Card from '@material-ui/core/Card';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { Route, useHistory } from 'react-router-dom';

import { StoreFeatureGameDetail } from '@react-apps-workspace/store/feature-game-detail';
import { useEffect, useState } from 'react';

interface IState {
  data: Game[];
  loadingState: 'success' | 'error' | 'loading';
}

export const App = () => {
  const history = useHistory();

  const [state, setState] = useState<IState>({
    data: [],
    loadingState: 'success',
  });

  // gathering the games data from the Express server
  useEffect(() => {
    setState({ ...state, loadingState: 'loading' });
    fetch('/api/games')
      .then((x) => x.json())
      .then((res) => {
        setState({ ...state, data: res, loadingState: 'success' });
      })
      .catch((err) => {
        setState({ ...state, loadingState: 'error' });
      });
  }, []);

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className={styles['container']}>
        <div className={styles['games-layout']}>
          {state.loadingState === 'loading'
            ? 'Loading...'
            : state.loadingState === 'error'
            ? <div>Error retriving data</div>
            : state.data.map((game) => (
                <Card
                  key={game.id}
                  className={styles['game-card']}
                  onClick={() => history.push(`/game/${game.id}`)}
                >
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
        <Route path="/game/:id" component={StoreFeatureGameDetail} />
      </div>
    </>
  );
};

export default App;
