import { renderFile } from 'ejs';
import { promisify } from 'bluebird';
import moment from 'moment';


let renderFileAsync = promisify(renderFile);

export async function renderResetTemplate(dateObject, username, email, confirmationLink) {
  let date = moment(dateObject).format('Do [of] MMMM YYYY');

  return await renderFileAsync(
    `${__dirname}/reset.ejs`,
    { confirmationLink, date, email, username }
  );
}

export async function renderWelcomeTemplate(dateObject, username, email, confirmationLink) {
  let date = moment(dateObject).format('Do [of] MMMM YYYY');

  return await renderFileAsync(
    `${__dirname}/welcome.ejs`,
    { confirmationLink, date, email, username }
  );
}
