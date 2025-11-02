import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function initUser(id, username) {
	const { error } = await supabase.from('users').insert({
		id,
		username,
		balance: 500,
		last_claim: new Date().toISOString(),
	});
	console.log(error);
}

export async function fetchUserData(id) {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.log(error);
		return null;
	}
	console.log('fetched: ', id);
	return data;
}

export async function updateUser(userObject, id) {
	const { data, error } = await supabase
		.from('users')
		.update({
			balance: userObject.balance,
		})
		.eq('id', id)
		.select();
	console.log(userObject);
	console.log(data);
	console.log(error);
}

// module.exports = {
// 	fetchBalance: async (id) => {
// 		const { data, error } = await supabase
// 			.from('userdata')
// 			.select('balance')
// 			.eq('userID', id)
// 			.single();
// 		return data;
// 	},

// 	updateBalance: async (id, username, newAmount) => {
// 		const { data, error } = await supabase
// 			.from('userdata')
// 			.upsert({ userID: id, username: username, balance: newAmount })
// 			.select();
// 	},

// 	updateDate: async (id, date) => {
// 		const { data, error } = await supabase
// 			.from('userdata')
// 			.upsert({ userID: id, date: date })
// 			.select();
// 	},

// 	fetchDate: async (id) => {
// 		const { data, error } = await supabase
// 			.from('userdata')
// 			.select('date')
// 			.eq('userID', id)
// 			.single();
// 		return data;
// 	},

// 	isInDB: async (id) => {
// 		const { data, error } = await supabase
// 			.from('userdata')
// 			.select('*')
// 			.eq('userID', id)
// 			.single();
// 		if (data != null) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	},
// };
