const Bots = [
    {
        id: 1,
        name: 'Marin',
        avatar: 'https://nicolas-marin.netlify.app/assets/png/marin.png',
        status: 'active',
        offset: '',
        trigger:
            {
                default: {
                    input: 'Bonjour',
                    response: 'Wesh !'
                },
                api: {
                    type: 'biere',
                    input: 'Bière',
                    // https://random-data-api.com/documentation
                    url: 'https://random-data-api.com/api/v2/beers?response_type=json',
                    response: 'Ma bière préférée est : '
                },
                janken: {
                    type: 'janken',
                    input: 'Janken',
                    response: 'Pierre'
                }
            },
        message: 0
    },
    {
        id: 2,
        name: 'Malik',
        avatar: 'https://cdn.discordapp.com/attachments/887310965220196415/1066025751142473758/image.png',
        status: 'active',
        offset: '',
        trigger:
            {
                default: {
                    input: 'Bonjour',
                    response: 'Coucou !! '
                },
                api: {
                    type: 'roll',
                    input: 'Roll',
                    // https://rolz.org/help/api
                    url: 'https://rolz.org/api/?6d6.json',
                    response: 'Vos jets de dés : '
                },
                janken: {
                    type: 'janken',
                    input: 'Janken',
                    response: 'Feuille'
                }
            },
        message: 0
    },
    {
        id: 3,
        name: 'Razoff',
        avatar: 'https://raymanpc.com/wiki/images/thumb/0/0e/Rayman_3_Razoff_1.png/320px-Rayman_3_Razoff_1.png',
        status: 'active',
        offset: '',
        trigger:
            {
                default: {
                    input: 'Bonjour',
                    response: 'Il y a des intrus dans ma maison, je vais les accueillir comme il se doit !'
                },
                api: {
                    type: 'blood',
                    input: 'Groupe Sanguin',
                    // https://random-data-api.com/documentation
                    url: 'https://random-data-api.com/api/v2/blood_types?response_type=json',
                    response: 'Mon groupe sanguin est : '
                },
                janken: {
                    type: 'janken',
                    input: 'Janken',
                    response: 'Ciseaux'
                }
            },
        message: 0
    }
];

export default Bots;