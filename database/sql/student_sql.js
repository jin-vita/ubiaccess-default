module.exports = {
    student_list: {
        sql: `select id, name, age, mobile, profile
              from test.student`,
        count: `select count(*) as total 
                from test.student`,
        where: `where # `,
        order: `order by # `,
        page: `limit #`
    },
    student_insert: {
        sql: `insert into test.student 
                 (name, age, mobile, profile, created_date, modified_date) 
              values 
                 (:name, :age, :mobile, :profile, now(), now())`
    },
    student_update: {
        sql: `update test.student 
              set name = :name, 
                  age = :age, 
                  mobile = :mobile,
                  profile = :profile,
                  modified_date = now()
              where id = :id`
    },
    student_delete: {
        sql: `delete from test.student 
            where id = :id`
    }
}