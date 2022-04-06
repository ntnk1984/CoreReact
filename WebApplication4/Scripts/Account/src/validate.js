class Validate {
    checkRequire = () => ({
      required: true,
      message: "Vui lòng nhập !",
    });
    checkUsername=()=>({
      pattern: new RegExp(/^[a-z0-9A-Z_]{3,16}$/g),
      message: "Định dạng không đúng !",
    });
    checkPassword=()=>({
      pattern: new RegExp(/^[A-Z0-9a-z\d@$!%*?&#%^&]{8,20}$/g),
      message: "Định dạng không đúng !",
    });
    checkMail = () => ({
      pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      message: "Định dạng không đúng !",
    });
    checkName = () => ({
      pattern: new RegExp(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u),
      message: "Định dạng không đúng !",
    });
    checkPhone=()=>({
      pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g),
      message: "Định dạng không đúng !",
    });
    checkCodePost=()=>({
      pattern: new RegExp(/^[0-9]{6,6}$/g),
      message: "Định dạng không đúng !",
    });
    
  }
  
  export const validate = new Validate();
  