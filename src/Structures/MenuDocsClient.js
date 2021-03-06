const { Client, Collection, Permissions } = require('discord.js');
const Util = require('./Util.js');


module.exports = class MenuDocsClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.events = new Collection();

        this.utils = new Util(this);

        this.owners = options.owners;
    }


    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

        if (!options.prefix) throw new Error('You must pass a prefix for the client.');
        if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
        this.prefix = options.prefix;

        if (!options.defaultPerms) throw new Error('You must pass default perm(s) for the Client.');
        this.defaultPerms = new Permissions(options.defaultPerms).freeze();
    }

    async start(prefix = this.prefix) {
        this.utils.loadCommands();
        this.utils.loadEvents();

        await super.login(process.env.TOKEN);
    }

};
