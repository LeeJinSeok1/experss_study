# 프로젝트 시작
npm init

# dependency (라이브러리 설치)
npm install [dependency 이름]
- express: 백엔드 프레임워크
- cors: cors 설정 
- json: json 파싱 
- body-parser: 요청 body 받기
- nodemon: index.js 업로드시 서버 새로고침

# api 테스트 
- postman
- REST Client 

# db
- 기존에 있던 로컬 db 서버에
- create database express_study
- use express_study 
- create table game_table(
  id bigint primary key auto_increment,
  game_name varchar(100),
  game_peoples int,
  game_since varchar(100)
  );
- select*from game_table

- insert into game_table(game_name,game_peoples,game_since) values(?,?,?)