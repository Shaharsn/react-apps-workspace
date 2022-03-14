import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { formatRating } from '@react-apps-workspace/store/util-formatters';
import { Game } from 'libs/api/util-interfaces/src';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './store-feature-game-detail.scss';

type TParams = { id: string };

interface IState {
  data: Game | null;
  loadingState: 'success' | 'error' | 'loading';
}

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  const { match } = props;

  const [state, setState] = useState<IState>({
    data: null,
    loadingState: 'success',
  });

  // gathering the games data from the Express server
  useEffect(() => {
    const gameId = match.params.id;

    setState({ ...state, loadingState: 'loading' });

    fetch(`/api/game/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({ ...state, data: res, loadingState: 'success' });
      })
      .catch((err) => {
        setState({ ...state, loadingState: 'error' });
      });
  }, [match.params.id]);

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
