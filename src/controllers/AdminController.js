export default (req, res) => {
    res.render('admin', {username : req.user});
}