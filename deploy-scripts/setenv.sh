PROJECT_NAME=connect-integration-datastreaming
STAGE=dev
PROJECT_SOURCE_BUCKET=setOrOverrideThisToABucketYouOwn
PROFILE=default
DB_PASSWORD=SetThis123
DB_USER=setthis
PRIVATE_SUBNET_ID=setthis
PUBLIC_SUBNET_ID=setthis
VPC_ID=setthis
NAT_Gateway_IP=setthis


if [ -e ~/.connect-integration-datastreaming.sh ]; then
    echo "User override file exists"
    . ~/.connect-integration-datastreaming.sh
fi
