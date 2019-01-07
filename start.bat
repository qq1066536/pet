@echo off

cd client
start  cmd /k npm run serve
cd ../server
start  cmd /c npm start


