#!/bin/bash 
set -e

cluster=(`kubectl describe service/postgres | grep "IPs:" | awk '{print $2}'`) 


exec  1>./.env
echo "
GOOGLE_CLIENT_ID ='960351129448-gqgt249jbbntu7g39euoq5c3bpcesfls.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET ='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'
GOOGLE_CALLBACK ='https://carrectlyautocare.com/auth/google/callback'

GOOGLE_REFRESH_TOKEN ='1//0dRpRu4X-J3vRCgYIARAAGA0SNwF-L9IrmkooVwqYniL_Vrw_HF7Qurk8dU9fHAlgcFV8DxmbartorqaVItTkbFT4jb27laLQjTM'

DOMAIN ='http://carrectlyautocare.com'
travisApiToken ='h7wT6reeuPjpA7M-mWe1Mw'


/*square sandbox*/
squareApplicationId ='sq0idb-1tqa9fkMqCkzgv_8RMhJ7w'
SQUARE_TOKEN ='EAAAEPC4hWEeDK2uS1SQgwBVpFuMj47M4y4DjkhLfcBdAPhrBLAwjWTqrzE7Dbm-'
squareBasePath ='https://connect.squareupsandbox.com'
SQUARE_LOCATION_ID ='PRV2GHZVTGW0P'
Kubernetes_Cluster_DB ='$cluster'
"


exec "$@"