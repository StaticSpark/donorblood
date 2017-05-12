import { Model } from '@mean-expert/model';

@Model({
  hooks: {
    beforeRemoteHook:{ name: '**', type: 'beforeRemote'}
  },
  remotes: {
  }
})
class Donor {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

  	model.validatesInclusionOf('bloodGroup', {in: ['A', 'B','AB','O'],message:'Must be one of A,B,AB or O'});

  	var reEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  	model.validatesFormatOf('email', {with: reEmail, message: 'Must provide a valid email'});

  	var reTelephone = /^(\+|[0]{2})\d{2}\s{1}\d{3}\s{1}\d{4}\s{1}\d{3}$/;

	  model.validatesFormatOf('contactNumber', {with: reTelephone, message: 'Must provide a valid telephone number'});
  }

  beforeRemoteHook(ctx: any, modelInstance: any, next: Function):void{
    //TODO:the operations through websocket do not go here,need some hack later
    var ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
    modelInstance.ip = ip;
    next();
  }
}

module.exports = Donor;