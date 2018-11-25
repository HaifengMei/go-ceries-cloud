

const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "go-ceries-app"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://gzokhousnc.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2iR4XTS30",
    APP_CLIENT_ID: "70j474v4ppqcc7418cj1s0eiu6",
    IDENTITY_POOL_ID: "us-east-1:53d9fbbc-50e3-4212-933c-02f105a61f72"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "go-ceries-app"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://gzokhousnc.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2iR4XTS30",
    APP_CLIENT_ID: "70j474v4ppqcc7418cj1s0eiu6",
    IDENTITY_POOL_ID: "us-east-1:53d9fbbc-50e3-4212-933c-02f105a61f72"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};