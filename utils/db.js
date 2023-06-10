const mysql=require('mysql')
const config=require('../config/default.json')
const pool  = mysql.createPool(config.mysql);
module.exports={
    load:function(sql){
        return new Promise(function(fn_done,fn_fail){
            pool.query(sql,function(error,results,feilds){
                if(error){
                    return fn_fail(error.sqlMessage);
                }
                fn_done(results);
            });
        });
    },
    add:(table,entity)=>{//entity la mang dai dien cho cac cot trong table
        return new Promise((resolve,reject)=>{
            const sql=`insert into ${table} set ?` //?: dai dien cho entity
            pool.query(sql,entity,(error,results)=>{
                if (error) {
                    return reject(error)
                }
                resolve(results)
            })
        })
    },
    add2:(table,[entity])=>{//entity la mang dai dien cho cac cot trong table
        return new Promise((resolve,reject)=>{
            const sql=`insert into ${table}  (MaHD,ProName,Price,Quantity,IntoTotal) VALUES ?` //?: dai dien cho entity
            pool.query(sql,[entity],(error,results)=>{
                if (error) {
                    return reject(error)
                }
                resolve(results)
            })
        })
    },
    patch:(table,entity,condition)=>{
        return new Promise((resolve,reject)=>{
            const sql=`update ${table} set ? where ?`
            pool.query(sql,[entity,condition],(error,results)=>{//2 thuoc tinh ket hop vs nhau tao 1 mang
                if (error) {
                    return reject(error)
                }
                resolve(results)
            })
        })
    },
    del:(table,condition)=>{
        return new Promise((resolve,reject)=>{
            sql=`delete from ${table} where?`
            pool.query(sql,condition,(error,results)=>{
                if (error) {
                    return reject(error)
                }
                resolve(results)
            })
        })
    }
}