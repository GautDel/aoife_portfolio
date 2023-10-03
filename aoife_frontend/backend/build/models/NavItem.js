import mongoose from "mongoose";
const { Schema } = mongoose;
const NavItemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for your nav item'],
        unique: [true, 'This nav item already exists'],
        maxLength: [20, 'Item cannot be longer than 20 characters'],
    }
});
const NavItem = mongoose.model("NavItem", NavItemSchema);
export default NavItem;
