// # -----------------------------------------------------------------------------------------
// # MIT No Attribution
// # Permission is hereby granted, free of charge, to any person obtaining a copy of this
// # software and associated documentation files (the "Software"), to deal in the Software
// # without restriction, including without limitation the rights to use, copy, modify,
// # merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// # permit persons to whom the Software is furnished to do so.
// # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// # INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// # PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// # HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// # OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// # SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// # -----------------------------------------------------------------------------------------
console.log('Starting tblcreate.js');
const url = require('url');
const axios = require('axios');
const Database = require('./lib/database');

const send = async (
  event,
  context,
  responseStatus,
) => {
  console.log('Sending Response', responseStatus);
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: `See the details in CloudWatch Log Stream: ${context.logStreamName}`,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: {},
  });

  console.log('RESPONSE BODY:\n', responseBody);
  const parsedUrl = url.parse(event.ResponseURL);

  const options = {
    url: `https://${parsedUrl.hostname}${parsedUrl.path}`,
    host: parsedUrl.hostname,
    path: parsedUrl.path,
    method: 'PUT',
    headers: {
      'Content-Type': '',
      'Content-Length': responseBody.length,
    },
    timeout: 5000,
    data: responseBody,
  };

  console.log('HTTPS Call Request', options);
  const result = await axios(options)
    .catch((err) => {
      console.log('HTTPS Call Error', err);
    });

  console.log('HTTPS Call Result', result);
};

exports.handler = async (event, context) => {
  try {
    console.log(event);
    const config = {
      host: event.ResourceProperties.host,
      database: event.ResourceProperties.db,
      user: event.ResourceProperties.user,
      password: event.ResourceProperties.password,
      port: event.ResourceProperties.port,
    };

    if (event.RequestType === 'Create') {
      const database = new Database(config);

      const permissionsQuery1 = 'CREATE TABLE ctr (acw_end_tstamp TIMESTAMP, acw_start_tstamp TIMESTAMP, aws_account_id BIGINT NOT NULL, aws_ctr_format_ver VARCHAR(32), channel VARCHAR(255), conn_to_agent_tstamp TIMESTAMP, conn_to_ac_tstamp TIMESTAMP, contact_id VARCHAR(255), org_contact_id VARCHAR(255) distkey, ctr_init_tstamp TIMESTAMP, cust_addr_type VARCHAR(255), cust_addr_val VARCHAR(255), dequeue_tstamp TIMESTAMP, disc_tstamp TIMESTAMP sortkey, enqueue_tstamp TIMESTAMP, handle_attempts INTEGER, handled_by_agent VARCHAR(255), hold_dur INTEGER, init_tstamp TIMESTAMP, last_upd_tstamp TIMESTAMP, ac_addr_type VARCHAR(255), ac_addr_val VARCHAR(255), num_of_holds INTEGER, orig_contact_id VARCHAR(255), prev_contact_id VARCHAR(255), queue VARCHAR(255), rec_loc VARCHAR(255), tlk_duration INTEGER);';

      const permissionsQuery2 = 'CREATE TABLE ctr_attr (aws_account_id BIGINT NOT NULL, org_id VARCHAR(255), contact_id VARCHAR(255) distkey, orig_contact_id VARCHAR(255), init_tstamp TIMESTAMP, disc_tstamp TIMESTAMP sortkey, last_upd_tstamp TIMESTAMP, attr_key VARCHAR(255), attr_val VARCHAR(255));';

      try {
        const query1 = await database.query(permissionsQuery1, { raw: true })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        console.log('Query 1 result');
        console.log(query1);
        const query2 = await database.query(permissionsQuery2, { raw: true })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        console.log('Query 2 result');
        console.log(query2);
      } catch (err) {
        console.log(err);
        await send(event, context, 'FAILED');
        return;
      }


      await send(event, context, 'SUCCESS');
    } else if (event.RequestType === 'Update') {
      await send(event, context, 'SUCCESS');
    } else if (event.RequestType === 'Delete') {
      await send(event, context, 'SUCCESS');
    }
  } catch (err) {
    console.log(err);
    await send(event, context, 'FAILED');
  }
};
