const db=require('../utils/db');
const TBL_CATEGORIES='categories'
module.exports={
    all:_=> { return db.load(`select * from ${TBL_CATEGORIES}`)},
    add:(entity)=>{return db.add(TBL_CATEGORIES,entity)},
    single:(id)=>{return db.load(`select * from ${TBL_CATEGORIES} where CatID=${id}`)},
    patch:(entity)=>{
        const condition={CatID:entity.CatID}// de dieu kien cho where
        delete entity.CatID// xoa id vi ko update id
        return db.patch(TBL_CATEGORIES,entity,condition)
    },
    del:(id)=>{
        const condition={
            CatID:id
        }
        return db.del(TBL_CATEGORIES,condition)
    },
    allWithDetails:_=>{
        return db.load(`select c.*,count(p.ProID) as num_of_products 
        from ${TBL_CATEGORIES} c left join products p on c.CatID=p.CatID 
        group by c.CatID, c.CatName`)
    }
};