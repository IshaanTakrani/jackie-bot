export class GameResultEmbed {
	constructor(interaction) {
		this.skeleton = {
			color: 0x46ba2a,
			author: {
				name: 'Jackie',
				icon_url: 'https://m.media-amazon.com/images/I/71lj9cp80dL.jpg',
				url: 'https://github.com/ishaanTakrani',
			},
			title: `${interaction.user.username}`,
			fields: [],
			thumbnail: {
				url: interaction.user.displayAvatarURL({
					dynamic: true,
					size: 4096,
				}),
			},
		};
	}

	setStat(stat) {
		if (stat == 'positive') {
			this.skeleton.color = 0x3dba1a;
		} else if (stat == 'negative') {
			this.skeleton.color = 0xba1a1a;
		} else if (stat == 'neutral') {
			this.skeleton.color = 0xdbd362;
		} else {
			this.skeleton.color = 0xffffff;
		}
		return this;
	}

	setName(name) {
		this.skeleton.title = this.skeleton.title + `'s ${name}`;
		return this;
	}

	setTitle(title) {
		this.skeleton.title = title;
		return this;
	}

	addResult(name, value) {
		this.skeleton.fields.push({ name: name, value: value });
		return this;
	}

	addBalanceSection(oldbal, newbal) {
		this.skeleton.fields.push({
			name: 'Balance',
			value: `Old balance: ${oldbal} :coin:\nNew balance: ${newbal} :coin:`,
		});

		return this;
	}
	build() {
		return this.skeleton;
	}
}

export class BalanceEmbed {
	constructor(interaction, balance) {
		this.balance = balance;
		this.skeleton = {
			color: 0x46ba2a,
			title: `${interaction.user.username}`,
			fields: [],
			thumbnail: {
				url: interaction.user.displayAvatarURL({
					dynamic: true,
					size: 4096,
				}),
			},
		};
	}

	setStat(stat) {
		if (stat == 'positive') {
			this.skeleton.color = 0x3dba1a;
		} else if (stat == 'negative') {
			this.skeleton.color = 0xba1a1a;
		} else if (stat == 'neutral') {
			this.skeleton.color = 0xdbd362;
		} else {
			this.skeleton.color = 0xffffff;
		}
		return this;
	}

	setBalance(bal) {
		this.balance = bal;
		return this;
	}

	setName(name) {
		this.skeleton.title = this.skeleton.title + `'s ${name}`;
		return this;
	}

	setTitle(title) {
		this.skeleton.title = title;
		return this;
	}

	addSection(name, value) {
		this.skeleton.fields.push({ name: name, value: value });
		return this;
	}

	setThumbnail(val) {
		this.skeleton.thumbnail.url = val;
		return this;
	}

	build() {
		this.skeleton.fields.push({
			name: 'Balance',
			value: `${this.balance} :coin:`,
		});
		return this.skeleton;
	}
}
