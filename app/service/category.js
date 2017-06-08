/**
 * Created by 1 on 2017/5/30.
 * 目录服务类
 */

module.exports = app => {
    class Category extends app.Service {
        * getCategoryList(sp_id) {
            const CategoryList = yield this.ctx.model.Category.findAll({
                include: [
                    {
                        model: this.ctx.model.Study,
                        as: 'courses',
                        required: false
                    }
                ],
                where: {
                    sp_id: sp_id
                }
            })
            return CategoryList
        }

        * doCreate(_param) {
            return yield this.ctx.model.Category.create(_param, function (category) {
                if (category) {
                    return category
                } else {
                    return false
                }
            })
        }

        /*
         * 目录主键
         * */
        * doUpdate(_param) {
            return yield this.ctx.model.Category
                .update(_param, {
                    where: {
                        id: _param.id
                    }
                })
                .then(function (affectedCount) {
                    console.log(affectedCount[0]);
                    if (affectedCount[0] > 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
        }

        * doDelete(_param) {
            const t = yield this.ctx.model.transaction();
            try {
                const dresult = yield this.ctx.model.Category.destroy({
                    where: {
                        id: _param.id
                    }
                }, {transaction: t})
                const uresult = yield this.ctx.model.Study.update({"category_id": ""}, {
                    where: {
                        category_id: _param.id
                    }
                }, {transaction: t})
                yield t.commit()
                return true
            } catch (err) {
                console.log(err)
                yield t.rollback
                return false
            }


        }
    }
    return Category
}
