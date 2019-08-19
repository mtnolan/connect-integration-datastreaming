. deploy-scripts/setenv.sh

sam deploy \
  --template-file packaged.yml \
  --stack-name $PROJECT_NAME-$STAGE \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides  \
  PrivateSubnetID=$PRIVATE_SUBNET_ID \
  PublicSubnetID=$PUBLIC_SUBNET_ID \
  VPCID=$VPC_ID\
  NATGatewayIP=$NAT_Gateway_IP \
  DBUser=$DB_USER \
  DBPwd=$DB_PASSWORD \
  --profile $PROFILE
