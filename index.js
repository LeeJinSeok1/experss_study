import express, {request, response} from "express";

const app = express();

import mysql from "mysql";

// json 데이터 받기 위해 사용
app.use(express.json());

// db 접속 정보
const db = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "123456789",
   port: "3306",
   database: "express_study"
});

db.connect(err => {
    if(err === null){
        console.log("db연결 성공!!");
    }else{
        console.log("db연결 실패 에러내용: ",err);
    }

})

// 서버포트: 8000 설정
// localhost:8000
app.listen(8000, () =>{
    console.log("8000서버 호출")
});

// 기분 주소 요청 처리
// localhost:8000/
app.get("/", () =>{
   console.log("기본주소 요청")
});

app.get("/hello",() => {
    console.log("hello 주소 요청")
})

// query string 받기
app.get("/testQueryString", (response) => {
    console.log(response.query)
    console.log(response.query.p1)
    console.log(response.query.p2)
});


// post
app.post("/hello", () =>{
    console.log("hello post 요청")
})

// post query string
app.post("/post-testQueryString",(response)=>{
    console.log(response.query)
    console.log(response.query.p1)
    console.log(response.query.p2)
})

// json
app.post("/post-json", (response) => {
    console.log(response.body)
    console.log(response.body.name)
    console.log(response.body.age)
    const { name,age } = response.body;
    console.log(`멋쟁이: ${name}, 숫자에 불가하지만 ${age} 살 입니다..`);
});

app.post("/save_game", (response) => {
    const { game_name,game_peoples,game_since}= response.body;
    console.log(`게임명: ${game_name} 회원 수: ${game_peoples} 출시: ${game_since}`)

    const sql_query ="insert into game_table (game_name,game_peoples,game_since) values(?,?,?) ";

    db.query(sql_query,[game_name,game_peoples,game_since],(err,results) => {
        if(err===null){
            console.log("results: ",results)
        }else{
            console.log("err: ",err);
        }
    })

});

app.get("/list", (req,res) => {
    const sql_query = "select*from game_table";
    db.query(sql_query,(err,results,fields) =>{
        if(err===null){
            console.log("results: ",results)
            console.log("fields: ",fields);

            res.json(results);

        }else{
            console.log("err: ",err);
        }
    })
})


app.get("/list/:id",(req,res) => {
const id = req.params.id;
const sql_query = "select*from game_table where id=?"
    db.query(sql_query, [id] , (err,results,fields) =>{
        if(err===null){
            if(results.length === 0){
                res.status(404).send("요청하신 내용이 없습니다.")
            }else{
                res.json(results)
            }
            console.log("results: ",results);
        }else{
            console.log("err: ",err);
        }
    })
});

app.put("/:id",(req,res) => {
    const { id,game_name,game_peoples,game_since } =req.body;
    console.log(`id: ${id} 게임명: ${game_name} 회원 수: ${game_peoples} 출시: ${game_since}`)
    const sql_query = "update game_table set game_name=? where id=?";

    db.query(sql_query,[game_name,id],(err,results,fields) =>{
        if(err===null){
            console.log("results: ",results);
        }else{
            console.log("err: ",err);
        }
    })

})


app.put("/update_game/:id",(req,res) => {
    const { id,game_name,game_peoples,game_since } =req.body;
    console.log(`id: ${id} 게임명: ${game_name} 회원 수: ${game_peoples} 출시: ${game_since}`)

    const sql_query = "update game_table set game_name=?,game_peoples=?,game_since=? where id=?";

    db.query(sql_query,[game_name,game_peoples,game_since,id],(err,results,fields) =>{
        if(err===null){
            console.log("results: ",results);
        }else{
            console.log("err: ",err);
        }
    })
})

app.delete("/delete_game/:id", (req,res) =>{
    const id = req.params.id;
    const sql_query = "delete from game_table where id=?"
    db.query(sql_query, [id],(err,results) => {
        console.log("results: ",results);
        console.log("err: ",err);
    })
})

