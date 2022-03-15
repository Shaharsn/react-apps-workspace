import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { formatRating } from '@react-apps-workspace/store/util-formatters';
import { Game } from 'libs/api/util-interfaces/src';
import './store-feature-game-detail.scss';

interface IState {
  data: Game | null;
  loadingState: 'success' | 'error' | 'loading';
}

export const StoreFeatureGameDetail = () => {
  const params = useParams();

  const [state, setState] = useState<IState>({
    data: null,
    loadingState: 'success',
  });

  // gathering the games data from the Express server
  useEffect(() => {
    const gameId = params['id'];

    setState({ ...state, loadingState: 'loading' });
    console.log(state);

    fetch(`/api/game/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        console.log(res);
        console.log(res.image);

        setState({ ...state, data: res, loadingState: 'success' });
      })
      .catch((err) => {
        setState({ ...state, loadingState: 'error' });
      });
  }, [params]);

  return (
    <div className="container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error retriving data</div>
      ) : state.data != null && state.data.image ? (
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default StoreFeatureGameDetail;
