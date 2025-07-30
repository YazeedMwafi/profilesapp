import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-central-1', // your AWS region
    userPoolId: 'eu-central-1_9qe4outOv', // e.g. eu-central-1_XXXXXXXXX
    userPoolWebClientId: '5fej7hpgs2p8qp3k37tq0p3sni', // e.g. 5fej7hpgs2p8qp3k37tq0p3sni
  }
});