'use client';

function DesktopSidebar() {
  return (
    <>
      <div className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      ">
        <nav className="mt-4 flex flex-col justify-between">
         
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            className="cursor-pointer hover:opacity-75 transition"
          >
            {/* <Avatar user={currentUser} /> */}
          </div>
        </nav>
      </div>
    </>
    )
}

export default DesktopSidebar