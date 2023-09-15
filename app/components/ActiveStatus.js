'use client';

import useActiveMembers from "../hooks/useActiveMembers";

function ActiveStatus() {
  const { members } = useActiveMembers();

  return (
    <div>ActiveStatus</div>
  )
}

export default ActiveStatus