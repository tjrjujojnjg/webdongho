const db=require('../utils/db');
const TBL_PRODUCTS='products'
module.exports={
    all:_=> { return db.load('select * from products')},
    add:(entity)=>{return db.add(TBL_PRODUCTS,entity)},
    patch:(entity)=>{
        const condition={ProID:entity.ProID}
        delete entity.ProID
        return db.patch(TBL_PRODUCTS,entity,condition)
    },
    single:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where ProID=${id}`)},

    singleKl1:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=1`)},
    singleCL1:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=1`)},

    singleKl2:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=2`)},
    singleCL2:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=2`)},

    singleKl3:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=3`)},
    singleCL3:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=3`)},

    singleKl4:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=4`)},
    singleCL4:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=4`)},

    singleKl5:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=5`)},
    singleCL5:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=5`)},

    singleKl6:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=6`)},
    singleCL6:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=6`)},
    
    singleKl7:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=7`)},
    singleCL7:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=7`)},

    singleKl8:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=8`)},
    singleCL8:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=8`)},

    singleKl9:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=9`)},
    singleCL9:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=9`)},

    singleKl10:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} and not CatID=10`)},
    singleCL100:(id)=>{return db.load(`select * from ${TBL_PRODUCTS} where not ProID=${id} AND CatID=10`)},

    del:(id)=>{
        const condition={
            ProID:id
        }
        return db.del(TBL_PRODUCTS,condition)
    },
    allByCat:(catId)=>{
        return db.load(`select * from ${TBL_PRODUCTS} where CatID=${catId}`)
    },
    pageByCat:(catId,limit, offset)=>{
        return db.load(`select * from ${TBL_PRODUCTS} where CatID=${catId} limit ${limit} offset ${offset}`)//limit la gioi han bao nhieu san pham, offset la bat dau tu vi tri nao
    },
    countByCat:async function(catId){
        const rows=await db.load(`select count(*) as total from ${TBL_PRODUCTS} where CatID=${catId}`);
        return rows[0].total;
     }
};