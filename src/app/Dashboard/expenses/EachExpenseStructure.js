export default function EachExpenseStructure(){
    return(
        <div className=" w-full grid grid-cols-4 grid-rows-1 text-lg tracking-widest   border-green text-white rounded-t-sm px-4 py-2 bg-[#865ead]">
            <div className=" col-span-1">Name</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Action</div>
        </div>
    )
}