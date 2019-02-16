module.exports = {

    getMenus(req) {

        let menus = [
            {
                text:"Tela Inicial",
                href:"/admin/",
                icon:"home",
                active: false
            },
            {
                text:"Menu",
                href:"/admin/menus",
                icon:"cutlery",
                active: false
            },{
                text:"Reservas",
                href:"/reservations",
                icon:"calendar-check-o",
                active: false
            },{
                text:"Contatos",
                href:"/admin",
                icon:"home/contacts",
                active: false
            },{
                text:"Usuarios",
                href:"/admin/users",
                icon:"users",
                active: false
            },{
                text:"E-mails",
                href:"/admin/emails",
                icon:"envelope",
                active: false
            }
        ];

        menus.map(menu => {
            if (menu.href === `/admin${req.url}`) menu.active = true;
        });

        return menus;

    }

};