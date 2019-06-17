# step 01 : download node
FROM node:11.15.0
# step 02 : set up working directory
WORKDIR /usr/src/kanbrello
# step 03 : copy files 
COPY ./ ./
# step 04 : run 
RUN npm install  

CMD ["/bin/bash"] 