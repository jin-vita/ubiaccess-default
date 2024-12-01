module.exports = {
      sboard_mapping: {
            sql: `select 
                        source, target, details 
                  from sboard.sboard_mapping 
                  where source = :source`
      },

      sboard_agent_info_exist:`select 
            id 
          from sboard.sboard_agent 
          where id = :id`,
      
      sboard_update_agent_info:`update sboard.sboard_agent 
          set host = :host, 
              mac = :mac, 
              data_time = :data_time, 
              status = 'NORMAL', 
              status_date = now(), 
              modify_date = now() 
          where id = :id`,

      sboard_insert_agent_info:`insert into sboard.sboard_agent(id, host, mac, data_time, status, status_date, modify_date) 
          values 
          (:id, :host, :mac, :data_time, 'NORMAL', now(), now())`,

      sboard_dept_mapping_select: {
            sql: "select id, dept_id, dept_name, agent_id, agent_name, room_id, room_name \
                  from sboard.sboard_dept_mapping \
                  where dept_id = :deptId"
      },
      sboard_dept_mapping_update: {
            sql: "update sboard.sboard_dept_mapping \
                  set dept_name = :deptName \
                     ,agent_id = :agentId \
                     ,agent_name = :agentName \
                     ,room_id = :roomId \
                     ,room_name = :roomName \
                  where dept_id = :deptId"
      },
      sboard_dept_mapping_insert: {
            sql: "insert into sboard.sboard_dept_mapping \
                        (dept_id, dept_name, agent_id, agent_name, room_id, room_name) \
                  values \
                        (:deptId, :deptName, :agentId, :agentName, :roomId, :roomName)"
      },
      sboard_dept_mapping_list: {
            sql: "select id, dept_id, dept_name, agent_id, agent_name, room_id, room_name \
                  from sboard.sboard_dept_mapping"
      },
      sboard_room_mapping_select: {
            sql: "select id, room_id, agent_id \
                  from sboard.sboard_room_mapping \
                  where room_id = :roomId"
      },
      sboard_room_mapping_update: {
            sql: "update sboard.sboard_room_mapping \
                  set agent_id = :agentId \
                  where room_id = :roomId"
      },
      sboard_room_mapping_insert: {
            sql: "insert into sboard.sboard_room_mapping \
                        (room_id, agent_id) \
                  values \
                        (:roomId, :agentId)"
      },
      sboard_room_mapping_list: {
            sql: "select id, room_id, agent_id \
                  from sboard.sboard_room_mapping"
      },
      sboard_room_data_select: {
            sql: "select id, room_id, room_name, doctor_name, delay_time, delay_reason, \
                        ongoing_name, waiting_name1, waiting_name2, waiting_name3, waiting_name4, waiting_name5 \
                  from sboard.sboard_room_data \
                  where room_id = :roomId"
      },
      sboard_room_data_update: {
            sql: "update sboard.sboard_room_data \
                  set room_name = :roomName, doctor_name = :doctorName, delay_time = :delayTime, \
                        delay_reason = :delayReason, ongoing_name = :ongoingName, \
                        waiting_name1 = :waitingName1, waiting_name2 = :waitingName2, \
                        waiting_name3 = :waitingName3, waiting_name4 = :waitingName4, \
                        waiting_name5 = :waitingName5 \
                  where room_id = :roomId"
      },
      sboard_room_data_insert: {
            sql: "insert into sboard.sboard_room_data \
                        (room_id, room_name, doctor_name, delay_time, delay_reason, ongoing_name, \
                        waiting_name1, waiting_name2, waiting_name3, waiting_name4, waiting_name5) \
                  values \
                        (:roomId, :roomName, :doctorName, :delayTime, :delayReason, :ongoingName, \
                        :waitingName1, :waitingName2, :waitingName3, :waitingName4, :waitingName5)"
      },
      sboard_room_data_list: {
            sql: "select id, room_id, room_name, doctor_name, delay_time, delay_reason, ongoing_name, \
                        waiting_name1, waiting_name2, waiting_name3, waiting_name4, waiting_name5 \
                  from sboard.sboard_room_data"
      }
}