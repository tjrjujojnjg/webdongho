const db=require('../utils/db');
const TBL_USERS='users'
module.exports={
    //all:_=> { return db.load(`select * from ${TBL_CATEGORIES}`)},
    add:(entity)=>{return db.add(TBL_USERS,entity)},
    // singleByUserName: async(username)=>{
    //     const rows = await db.load(`select * from ${TBL_USERS} where username = ${username}`)
    //     if(rows.length === 0)
    //         return null;
    //     return rows[0];
    // },
    singleByUserName : async function(username){
        const rows = await db.load(`select * from ${TBL_USERS} where username='${username}'`);
        if(rows.length === 0)
            return null;
        return rows[0];
    },
    // permission: async function(permission){
    //     const rows = await db.load(`select * from ${TBL_USERS} where permission='${permission}'`);
    //     if(rows.length === 0)
    //         return null;
    //     return rows[0];
    // }
    // single:(id)=>{return db.load(`select * from ${TBL_CATEGORIES} where CatID=${id}`)},
    // patch:(entity)=>{
    //     const condition={CatID:entity.CatID}// de dieu kien cho where
    //     delete entity.CatID// xoa id vi ko update id
    //     return db.patch(TBL_CATEGORIES,entity,condition)
    // },
    // del:(id)=>{
    //     const condition={
    //         CatID:id
    //     }
    //     return db.del(TBL_CATEGORIES,condition)
    // },
    // allWithDetails:_=>{
    //     return db.load(`select c.*,count(p.ProID) as num_of_products 
    //     from ${TBL_CATEGORIES} c left join products p on c.CatID=p.CatID 
    //     group by c.CatID, c.CatName`)
    // }
};