import React from 'react'
import { Button } from './ui/button'
import { Link } from 'lucide-react'

const Header = () => {
    return (
        <div >
            <Button>Clik me </Button>
            <Button asChild>
                <a href="/login">Login</a>
            </Button>

        </div>
    )
}

export default Header