import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'
import { Affix, Button, rem, Transition } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useWindowScroll } from '@mantine/hooks';

function HomeLayout() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <>
    <NavBar/>
        <Outlet/>
        <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={
              <FontAwesomeIcon icon={faArrowUp} style={{ width: rem(16), height: rem(16) }} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  )
}

export default HomeLayout