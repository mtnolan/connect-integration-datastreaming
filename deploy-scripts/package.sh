. deploy-scripts/setenv.sh

sam package \
  --template-file template.yml \
  --output-template-file packaged.yml \
  --s3-bucket $PROJECT_SOURCE_BUCKET \
  --profile $PROFILE
