import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { deleteCommentsApi } from '../../Services/CommentServices';

export default function DropDown({ commentId, callback }) {
    async function deleteComment(id) {
        const response = await deleteCommentsApi(id);
        if (response.message) {
            await callback();
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <i className="fa-solid fa-ellipsis"></i>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit">Update</DropdownItem>
                <DropdownItem 
                    onClick={() => deleteComment(commentId)}
                    key="delete" className="text-danger"  color="danger" >Delete</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
