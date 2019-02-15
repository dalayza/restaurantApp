module.exports = {

  render(req, res, error) {

    res.render('reservations', {
      title: 'Reserva - Restaurant Saboroso!',
      background: 'images/img_bg_2.jpg',
      h1: 'Reserve uma mesa!',
      body: req.body,
      error
    });

  }

}