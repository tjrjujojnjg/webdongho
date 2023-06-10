const db=require('../utils/db')
const TBL_RECEIPTDETAILS='receiptdetails'
module.exports={
    all:_=>{return db.load(`select * from ${TBL_RECEIPTDETAILS}`)},
    add:([entity])=>{return db.add2(TBL_RECEIPTDETAILS,[entity])},
}