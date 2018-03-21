import {setFields} from "../app/Actions";

const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/fields?size=130';

const getFields = async (action) => {
	return await fetch(apiURL, {cache: 'no-store'})
		.then((response) => response.json())
		.then((responseJson) => {
			action(setFields(responseJson._embedded.fields));
		})
		.catch((error) => {
			console.error(error);
		});
};
export default getFields;
