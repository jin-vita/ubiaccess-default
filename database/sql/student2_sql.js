module.exports = {
    ///
    /// student 리스트 조회 SQL
    ///
    student_list: {
        sql: `select id, name, age, mobile 
              from test.student `,
        count: `select count(*) as total 
                from test.student`,
        where: ` where # `,
        order: ` order by # `,
        page: ` limit # `
    },

    ///
    /// student 단건 조회 SQL
    ///
    student_read: {
        sql: `select id, name, age, mobile 
            from test.student 
            where id = :id`
    },

    ///
    /// student 추가 SQL
    ///
    student_create: {
        sql: `insert into test.student 
                    (name, age, mobile) 
              values (:name, :age, :mobile)`
    },

    ///
    /// student 수정 SQL
    ///
    student_update: {
        sql: `update test.student 
              set name = :name, 
                  age = :age, 
                  mobile = :mobile 
              where id = :id`
    },

    ///
    /// student 삭제 SQL
    ///
    student_delete: {
        sql: `delete from test.student 
            where id = :id`
    }
}