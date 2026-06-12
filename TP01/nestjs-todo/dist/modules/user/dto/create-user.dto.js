"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDto = void 0;
const class_validator_1 = require("class-validator");
class createUserDto {
    username;
    email;
    password;
}
exports.createUserDto = createUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'ឈ្មោះត្រូវតែជាអក្សរ' }),
    (0, class_validator_1.MinLength)(3, { message: 'ឈ្មោះត្រូវតែមានយ៉ាងហោចណាស់ 3 អក្សរ' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]+$/, { message: 'ឈ្មោះត្រូវតែមានតែអក្សរ និងលេខ' }),
    __metadata("design:type", String)
], createUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[\w.-]+@[\w.-]+\.edu\.kh$/, { message: 'អុីម៉ែលមិនត្រឹមត្រូវ' }),
    __metadata("design:type", String)
], createUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'លេខសំងាត់ត្រូវតែជាអក្សរ' }),
    (0, class_validator_1.Matches)(/^(?=.*[*&+@!$%]).{6,15}$/, {
        message: 'លេខសំងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 អក្សរ និងមានអក្សរធំ អក្សរតូច លេខ និងសញ្ញាពិសេស',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "password", void 0);
//# sourceMappingURL=create-user.dto.js.map