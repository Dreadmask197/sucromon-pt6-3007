namespace SpriteKind {
    export const Sucromon = SpriteKind.create()
    export const Background = SpriteKind.create()
    export const SucromonChoice = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const SwitcherLabel = SpriteKind.create()
    export const Cover = SpriteKind.create()
    export const SwitcherCursor = SpriteKind.create()
    export const SucromonCapturer = SpriteKind.create()
    export const BattleMenuText = SpriteKind.create()
}
function AddSucromonOntoTheTeam (NewSucromonMember: Sprite) {
    SucromonTeam.push(NewSucromonMember)
}
function BattleFight (Sucromon: Sprite, WildSucromon: Sprite) {
    story.queueStoryPart(function () {
        animation.runMovementAnimation(
        Sucromon,
        animation.animationPresets(animation.easeRight),
        animationTime,
        false
        )
        pause(animationTime)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, WildSucromon).value += 0 - sprites.readDataNumber(Sucromon, "attack")
        scene.cameraShake(4, 200)
        animation.runMovementAnimation(
        Sucromon,
        animation.animationPresets(animation.easeLeft),
        animationTime,
        false
        )
        pause(animationTime)
    })
    WildSucromonMove()
    CheckBattleEnd()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveBattleMenuSelection(0)
    if (scene2 == "Overworld") {
        SpriteWalk(SucromonTrainer, 0)
    }
})
function MoveBattleMenuSelection (direction: number) {
    if (scene2 != "Battle Mode") {
        return
    }
    if (direction == 0) {
        if (SelectedMenuItem == SwitchMenuItem) {
            SelectedMenuItem = FightMenuItem
        } else if (SelectedMenuItem == RunMenuItem) {
            SelectedMenuItem = CatchMenuItem
        }
    } else if (direction == 1) {
        if (SelectedMenuItem == FightMenuItem) {
            SelectedMenuItem = CatchMenuItem
        } else if (SelectedMenuItem == SwitchMenuItem) {
            SelectedMenuItem = RunMenuItem
        }
    } else if (direction == 2) {
        if (SelectedMenuItem == FightMenuItem) {
            SelectedMenuItem = SwitchMenuItem
        } else if (SelectedMenuItem == CatchMenuItem) {
            SelectedMenuItem = RunMenuItem
        }
    } else {
        if (SelectedMenuItem == CatchMenuItem) {
            SelectedMenuItem = FightMenuItem
        } else if (SelectedMenuItem == RunMenuItem) {
            SelectedMenuItem = SwitchMenuItem
        }
    }
    Cursor.right = SelectedMenuItem.left
    Cursor.y = SelectedMenuItem.y
}
function ChangeScene (NewScene: string) {
    LastScene = scene2
    if (scene2 == "Sucromon Switcher") {
        BackgroundCover.destroy()
        SwitcherHealth.value = 0
        SwitcherHealth.destroy()
        DestroyAllKind(SpriteKind.SucromonChoice)
        DestroyAllKind(SpriteKind.SwitcherLabel)
        DestroyAllKind(SpriteKind.SwitcherCursor)
    } else if (scene2 == "Catch Attempt") {
        BackgroundCover.destroy()
        SucromonCapturer.destroy()
        ShowOrHideSucromon(otherSucromon, true)
        ShowOrHideSucromon(currentSucromon, true)
    } else if (scene2 == "Overworld") {
        tiles.setTilemap(tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, [myTiles.transparency16], TileScale.Sixteen))
        scene.cameraFollowSprite(CameraAnchor)
        SucromonTrainer.setFlag(SpriteFlag.Invisible, true)
    } else if (scene2 == "Battle Mode") {
        for (let value of sprites.allOfKind(SpriteKind.Sucromon)) {
            ShowOrHideSucromon(value, true)
        }
        Cursor.destroy()
        tiles.destroySpritesOfKind(SpriteKind.BattleMenuText)
    }
    scene2 = NewScene
}
function OpenOverworld () {
    ChangeScene("Overworld")
    tiles.setTilemap(tiles.createTilemap(hex`100010000101010101010108080101010101010101020505050509060e020505050509010103060e0606060e060c060d06060a010103060c0c0c0c0c0c0c0c0c0c060a0101030d060d060d0d060606060c0d0a0101030c0c0c0c0c0c0c0c0c060c060a0101030d0c060c060c0606060d0c060a0101030e0c06060d06060c060c0c0d0a010103060c060c0d0c0c0c0d0c0c060a010103060c0d0c060c0d0606060c060a0101030d0c060c0d0c060c0c0c0c060a0101030d060e0c060c060d06060c060a0101030c0c0c0c060c0c0c0c0c0c0d0a0101030d0d0606060e0e060e060d0d0a0101040707070707060607070707070b01010101010101010f0f01010101010101`, img`
        2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
        2 2 . . . . . . . 2 . . . . 2 2 
        2 2 . 2 2 2 2 2 2 2 2 2 2 . 2 2 
        2 2 . . . . . . . . . . 2 . 2 2 
        2 2 2 2 2 2 2 2 2 2 2 . 2 . 2 2 
        2 2 . 2 . 2 . 2 . . . . 2 . 2 2 
        2 2 . 2 . . . . . 2 . 2 2 . 2 2 
        2 2 . 2 . 2 . 2 2 2 . 2 2 . 2 2 
        2 2 . 2 . 2 . 2 . . . . 2 . 2 2 
        2 2 . 2 . 2 . 2 . 2 2 2 2 . 2 2 
        2 2 . . . 2 . 2 . . . . 2 . 2 2 
        2 2 2 2 2 2 . 2 2 2 2 2 2 . 2 2 
        2 2 . . . . . . . . . . . . 2 2 
        2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
        `, [myTiles.transparency16,sprites.castle.tilePath5,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.darkGroundNorth,sprites.castle.tileGrass2,sprites.dungeon.darkGroundSouth,sprites.dungeon.chestClosed,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundSouthEast0,sprites.dungeon.darkGroundCenter,sprites.castle.tileGrass1,sprites.castle.tileGrass3,sprites.castle.tilePath2], TileScale.Sixteen))
    if (!(SucromonTrainer)) {
        SucromonTrainer = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 8 2 8 . . . . . . . 
            . . . . . f 8 8 8 8 8 . . . . . 
            . . . . . f d d f d . . . . . . 
            . . . . . f e d d d . . . . . . 
            . . . . . c e e e e . . . . . . 
            . . . . 8 c 2 9 9 2 8 . . . . . 
            . 8 . . 8 c 2 c c 2 8 . . 8 . . 
            . 8 8 . 8 c 2 9 9 2 8 . 8 8 . . 
            . . 8 8 8 c 2 c c 2 8 8 8 . . . 
            . . . . . c 2 9 9 2 . . . . . . 
            . . . . . c 2 2 2 2 . . . . . . 
            . . . . . c c . c c . . . . . . 
            . . . . . c c . c c . . . . . . 
            . . . . . c c . c c . . . . . . 
            `, SpriteKind.Player)
        tiles.placeOnRandomTile(SucromonTrainer, sprites.castle.tilePath2)
    }
    scene.cameraFollowSprite(SucromonTrainer)
    SucromonTrainer.setFlag(SpriteFlag.Invisible, false)
}
function BattleSwitch () {
    ShowSwitcherMenu()
}
function BattleRun () {
    Cursor.say("Run")
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 == "Battle Mode") {
        if (SelectedMenuItem == FightMenuItem) {
            BattleFight(currentSucromon, otherSucromon)
        } else if (SelectedMenuItem == CatchMenuItem) {
            BattleCatch()
        } else if (SelectedMenuItem == SwitchMenuItem) {
            BattleSwitch()
        } else if (SelectedMenuItem == RunMenuItem) {
            BattleRun()
        }
    } else if (scene2 == "Sucromon Switcher") {
        SetCurrentSucromon(SelectedSucromonMember)
        ChangeScene(LastScene)
        createBattleMenu()
        ShowOrHideSucromon(otherSucromon, false)
    } else {
    	
    }
})
function WildSucromonMove () {
    story.queueStoryPart(function () {
        animation.runMovementAnimation(
        otherSucromon,
        animation.animationPresets(animation.easeLeft),
        animationTime,
        false
        )
        pause(animationTime)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value += 0 - sprites.readDataNumber(otherSucromon, "attack")
        scene.cameraShake(4, 200)
        animation.runMovementAnimation(
        otherSucromon,
        animation.animationPresets(animation.easeRight),
        animationTime,
        false
        )
        pause(animationTime)
        CheckBattleEnd()
    })
}
function switchSucromon () {
    nextSucromon = (SucromonTeam.indexOf(currentSucromon) + 1) % SucromonTeam.length
    SetCurrentSucromon(SucromonTeam[nextSucromon])
}
function SpriteWalk (sprite: Sprite, direction: number) {
    if (sprites.readDataBoolean(sprite, "Walking")) {
        return
    }
    sprites.setDataBoolean(sprite, "Walking", true)
    WalkAnimationTime = 200
    if (direction == 0) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top)))) {
            animation.runMovementAnimation(
            sprite,
            "l 0 -16",
            WalkAnimationTime,
            false
            )
        }
    } else if (direction == 1) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Right)))) {
            animation.runMovementAnimation(
            sprite,
            "l 16 0",
            WalkAnimationTime,
            false
            )
        }
    } else if (direction == 2) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Bottom)))) {
            animation.runMovementAnimation(
            sprite,
            "l 0 16",
            WalkAnimationTime,
            false
            )
        }
    } else if (direction == 3) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Left)))) {
            animation.runMovementAnimation(
            sprite,
            "l -16 0",
            WalkAnimationTime,
            false
            )
        }
    }
    pause(WalkAnimationTime)
    tiles.placeOnTile(sprite, tiles.locationOfSprite(sprite))
    sprites.setDataBoolean(sprite, "Walking", false)
    if (sprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass2)) {
        Encounter = GetRandomEncounter()
        if (Encounter) {
            startBattle(SucromonTeam[0], Encounter)
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveBattleMenuSelection(3)
    if (scene2 == "Overworld") {
        SpriteWalk(SucromonTrainer, 3)
    }
})
function BattleCatch () {
    ChangeScene("Catch Attempt")
    ShowOrHideSucromon(currentSucromon, false)
    ShowOrHideSucromon(otherSucromon, false)
    BackgroundCover = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.Player)
    BackgroundCover.bottom = 120
    story.queueStoryPart(function () {
        SucromonCapturer = sprites.create(img`
            . . . . 2 f f f f f 2 . . . . 
            . . e e f 5 5 f 5 5 f e e . . 
            . e e f 5 5 5 f 5 5 5 f e e . 
            . e f f 5 5 5 f 5 5 5 f f e . 
            2 f e e f 5 5 f 5 5 f e e f 2 
            f e e e e f 5 f 5 f e e e e f 
            f e e e e e f f f e e e e e f 
            f f f f f f f f f f f f f f f 
            f 5 5 5 5 5 f f f 5 5 5 5 5 f 
            f 5 5 5 5 f e f e f 5 5 5 5 f 
            2 f 5 5 f e e f e e f 5 5 f 2 
            . e f f e e e f e e e f f e . 
            . e e f e e e f e e e f e e . 
            . . e e f e e f e e f e e . . 
            . . . . 2 f f f f f 2 . . . . 
            `, SpriteKind.SucromonCapturer)
        SucromonCapturer.right = 0
        SucromonCapturer.follow(otherSucromon)
        SucromonCapturer.z = 100
        pause(1000)
    })
    story.queueStoryPart(function () {
        otherSucromon.setFlag(SpriteFlag.Invisible, true)
        pause(1000)
        CatchSuccessful = SuccessCanCatchSucromon()
    })
    story.queueStoryPart(function () {
        if (CatchSuccessful) {
            effects.confetti.startScreenEffect(500)
            story.printDialog("GOT IT!!", 80, 90, 50, 150, 15, 1)
            AddSucromonOntoTheTeam(otherSucromon)
            story.queueStoryPart(function () {
                OpenOverworld()
            })
        } else {
            SucromonCapturer.destroy()
            otherSucromon.setFlag(SpriteFlag.Invisible, false)
            story.queueStoryPart(function () {
                story.printDialog("OH NO! IT BROKE OUT!", 80, 90, 50, 150, 15, 1)
            })
            WildSucromonMove()
            story.queueStoryPart(function () {
                ChangeScene("Battle Mode")
                createBattleMenu()
                ShowOrHideSucromon(otherSucromon, false)
            })
        }
    })
}
function CheckBattleEnd () {
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value == 0) {
        BattleSwitch()
    } else if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value == 0) {
        BattleMenuIsOpen = false
    }
}
function GetRandomEncounter () {
    if (Math.percentChance(50)) {
        return CreateSucromon(img`
            ................................
            ...............aa...............
            .......88..aaaaaaaaaa..88.......
            .....68998.af1faaf1fa.89986.....
            .....689986a1ffaaff1a689986.....
            ......68866aff1aa1ffa66886......
            ..66...6667aaaaaaaaaa7666...66..
            ..886..6677aaaaaaaaaa7766..688..
            .8998666778aaaaaaaaaa8776668998.
            .899866778878888888878877668998.
            ..8866778877888888887788776688..
            ...66778877788888888777887766...
            .....7eee77788888888777eee7.....
            .....eeeeeee88888888eeeeeee.....
            .....e..eeee88888888eeee..e.....
            ......88.eee88888888eee.88......
            ....68998.ee88888888ee.89986....
            ....68998...88888888...89986....
            .....68866..88888888..66886.....
            .66...66667.88888888.766666..66.
            .886..6667788888888887766666688.
            89986666778888888888887766668998
            89986667788eee88eee8788776668998
            .8866677887eee77eee777887766688.
            ...66778877eee77eee7777887766...
            ....7788777eee77eee777778877....
            .....887777eee77eee77777788.....
            ...........eee..eee.............
            ...........eee..eee.............
            ................................
            ................................
            ................................
            `, "PEAFLY", 20, 10)
    }
    return [][0]
}
function createBattleMenu () {
    FightMenuItem = createMenuItemSprite("FIGHT")
    FightMenuItem.left = 10
    FightMenuItem.top = 60
    CatchMenuItem = createMenuItemSprite("CATCH")
    CatchMenuItem.left = 90
    CatchMenuItem.top = 60
    RunMenuItem = createMenuItemSprite("RUN")
    RunMenuItem.left = 90
    RunMenuItem.top = 90
    SwitchMenuItem = createMenuItemSprite("SWITCH")
    SwitchMenuItem.left = 10
    SwitchMenuItem.top = 90
    BattleMenuIsOpen = true
    SelectedMenuItem = FightMenuItem
    Cursor = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 5 1 1 5 5 b 
        b 5 1 5 5 1 5 b 
        b 5 1 5 5 1 5 b 
        b 5 5 1 1 5 5 b 
        . b 5 5 5 5 b . 
        . . b b b b . . 
        `, SpriteKind.Player)
    Cursor.right = SelectedMenuItem.left
    Cursor.y = SelectedMenuItem.y
}
function ShowOrHideSucromon (theSucromon: Sprite, ShouldHide: boolean) {
    theSucromon.setFlag(SpriteFlag.Invisible, ShouldHide)
    sprites.readDataSprite(theSucromon, "label").setFlag(SpriteFlag.Invisible, ShouldHide)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, theSucromon).setFlag(SpriteFlag.Invisible, ShouldHide)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveBattleMenuSelection(1)
    if (scene2 == "Overworld") {
        SpriteWalk(SucromonTrainer, 1)
    }
})
function SetCurrentSucromon (SucromonMember: Sprite) {
    ShowOrHideSucromon(currentSucromon, true)
    currentSucromon = SucromonMember
    moveSucromon(currentSucromon, BattlePositionX, battlePositionY)
    ShowOrHideSucromon(currentSucromon, false)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveBattleMenuSelection(2)
    if (scene2 == "Overworld") {
        SpriteWalk(SucromonTrainer, 2)
    }
})
sprites.onOverlap(SpriteKind.SwitcherCursor, SpriteKind.SucromonChoice, function (sprite, otherSprite) {
    if (scene2 == "Sucromon Switcher") {
        SelectedSucromonMember = sprites.readDataSprite(otherSprite, "sucromon")
        SelectedSucromonBar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, SelectedSucromonMember)
        SwitcherHealth.max = SelectedSucromonBar.max
        SwitcherHealth.value = SelectedSucromonBar.value
        SucromonLabel.setText(sprites.readDataString(SelectedSucromonMember, "name"))
        SucromonLabel.x = 80
    } else {
    	
    }
})
function DestroyAllKind (Kind: number) {
    for (let value of sprites.allOfKind(Kind)) {
        value.destroy()
    }
}
function startBattle (mySucromon: Sprite, enemySucromon: Sprite) {
    ChangeScene("Start Battle Mode")
    moveSucromon(enemySucromon, 130, 20)
    moveSucromon(mySucromon, BattlePositionX, battlePositionY)
    currentSucromon = mySucromon
    otherSucromon = enemySucromon
    story.queueStoryPart(function () {
        ShowOrHideSucromon(enemySucromon, false)
    })
    story.queueStoryPart(function () {
        story.printDialog("A WILD " + sprites.readDataSprite(enemySucromon, "name") + " APPEARS", 80, 90, 50, 150)
    })
    story.queueStoryPart(function () {
        story.printDialog("GO GET 'EM " + sprites.readDataSprite(mySucromon, "name"), 80, 90, 50, 150)
    })
    story.queueStoryPart(function () {
        ShowOrHideSucromon(mySucromon, false)
        createBattleMenu()
    })
    story.queueStoryPart(function () {
        ChangeScene("Battle Mode")
    })
}
function ShowSwitcherMenu () {
    ChangeScene("Sucromon Switcher")
    BackgroundCover = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.Cover)
    HeaderTextSprite = textsprite.create("CHOOSE YOUR SUCROMON", 1, 15)
    HeaderTextSprite.setBorder(0, 0, 2)
    HeaderTextSprite.setMaxFontHeight(8)
    HeaderTextSprite.setPosition(76, 13)
    HeaderTextSprite.setKind(SpriteKind.SwitcherLabel)
    for (let index = 0; index <= SucromonTeam.length - 1; index++) {
        SucromonMember = SucromonTeam[index]
        SucromonChoice = sprites.create(SucromonMember.image, SpriteKind.SucromonChoice)
        sprites.setDataSprite(SucromonChoice, "sucromon", SucromonMember)
        col = index % 3
        row = Math.idiv(index, 3)
        SucromonChoice.x = col * 48 + 24
        SucromonChoice.y = row * 48 + 48
    }
    SwitcherHealth = statusbars.create(100, 8, StatusBarKind.Health)
    SwitcherHealth.setLabel("HP")
    SwitcherHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
    SwitcherHealth.setPosition(73, 104)
    SucromonLabel = textsprite.create("", 1, 15)
    SucromonLabel.setKind(SpriteKind.SwitcherLabel)
    SucromonLabel.setBorder(0, 0, 2)
    SucromonLabel.setMaxFontHeight(8)
    SucromonLabel.setPosition(71, 84)
    CursorSprite = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 5 1 1 5 5 b 
        b 5 1 5 5 1 5 b 
        b 5 1 5 5 1 5 b 
        b 5 5 1 1 5 5 b 
        . b 5 5 5 5 b . 
        . . b b b b . . 
        `, SpriteKind.SwitcherCursor)
    controller.moveSprite(CursorSprite)
}
function moveSucromon (theSucromon: Sprite, x: number, y: number) {
    theSucromon.setPosition(x, y)
    sprites.readDataSprite(theSucromon, "label").top = theSucromon.bottom + 8
    sprites.readDataSprite(theSucromon, "label").left = theSucromon.left - 7
}
function SuccessCanCatchSucromon () {
    if (Math.percentChance(5)) {
        return false
    }
    CatchPercentHealth = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).value / statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).max
    if (Math.percentChance(CatchPercentHealth * 100)) {
        return false
    }
    return true
}
function CreateSucromon (Portrait: Image, name: string, health: number, attack: number) {
    newSucromon = sprites.create(Portrait, SpriteKind.Sucromon)
    statusbar = statusbars.create(32, 5, StatusBarKind.Health)
    statusbar.attachToSprite(newSucromon, 2, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("HP")
    statusbar.max = health
    statusbar.value = health
    statusbar.z = newSucromon.z
    textSprite = textsprite.create(name)
    textSprite.setMaxFontHeight(8)
    textSprite.top = newSucromon.bottom + 8
    textSprite.left = newSucromon.left - 7
    sprites.setDataSprite(newSucromon, "label", textSprite)
    sprites.setDataString(newSucromon, "name", name)
    sprites.setDataNumber(newSucromon, "attack", attack)
    ShowOrHideSucromon(newSucromon, true)
    return newSucromon
}
function createMenuItemSprite (text: string) {
    NewMenuItem = textsprite.create(text, 1, 15)
    NewMenuItem.setMaxFontHeight(8)
    NewMenuItem.setBorder(0, 0, 2)
    NewMenuItem.setKind(SpriteKind.BattleMenuText)
    return NewMenuItem
}
let NewMenuItem: TextSprite = null
let textSprite: TextSprite = null
let statusbar: StatusBarSprite = null
let newSucromon: Sprite = null
let CatchPercentHealth = 0
let CursorSprite: Sprite = null
let row = 0
let col = 0
let SucromonChoice: Sprite = null
let SucromonMember: Sprite = null
let HeaderTextSprite: TextSprite = null
let SucromonLabel: TextSprite = null
let SelectedSucromonBar: StatusBarSprite = null
let BattleMenuIsOpen = false
let CatchSuccessful = false
let Encounter: Sprite = null
let WalkAnimationTime = 0
let nextSucromon = 0
let SelectedSucromonMember: Sprite = null
let currentSucromon: Sprite = null
let otherSucromon: Sprite = null
let SucromonCapturer: Sprite = null
let SwitcherHealth: StatusBarSprite = null
let BackgroundCover: Sprite = null
let LastScene = ""
let Cursor: Sprite = null
let CatchMenuItem: TextSprite = null
let FightMenuItem: TextSprite = null
let RunMenuItem: TextSprite = null
let SwitchMenuItem: TextSprite = null
let SelectedMenuItem: TextSprite = null
let SucromonTrainer: Sprite = null
let scene2 = ""
let battlePositionY = 0
let BattlePositionX = 0
let CameraAnchor: Sprite = null
let SucromonTeam: Sprite[] = []
let animationTime = 0
animationTime = 1000
SucromonTeam = [CreateSucromon(img`
    ...ffff.................fff.....
    ..f5555f..............ff555f....
    .f555555f............f555555f...
    .f5555555f..........f555555f....
    .f55555555f.........f55555f.....
    ..fff555555f.......f555555f.....
    .....f555555f.....f5555555f.....
    ......f555555ffffff5555555f.....
    ........55555551555555555....eee
    eee.....55155151555155155...eeee
    eee....551e11e11551e11e15...eeee
    eee....5551ee1515551ee155...eeee
    eee....555511551555511555...eeee
    eeee...555555551555555555...eeee
    eeee...515555551555555515..eeeee
    eeee...11111111111111111..eeeeee
    eeeee..55515555155555155..eeeeee
    eeeeeee.1111111111111111.eeeeeee
    eeeeeeee5555155155515555eeeeeeee
    .eeeeeee1111111111111111eeeeeeee
    .eeeeeee5555551151555555eeeeeeee
    ..eeeeee1111111111111111eeeeeee.
    ....eeee5555555115555555eeeeee..
    .......85555551151555555ee......
    .......855555151551555558.......
    .......855551551555155558.......
    .......855515551555515558.......
    .......855155551555551558.......
    .......851555551555555158.......
    .......815555551555555518.......
    .......8888..........8888.......
    .......8888..........8888.......
    `, "CRAMPER", 30, 6), CreateSucromon(img`
    64446......................64446
    464446....................644464
    4464446..................6444644
    44464446.......66.......64446444
    644464446......66......644464446
    .644464446.....66.....644464446.
    ..644464446....66....644464446..
    ...644464466.666666.664464446...
    ....644464446229922644464446....
    .....6444644421991244464446.....
    ......66446449999994464466......
    .......6444649aaaa9464446.......
    ........6444699999964446........
    .........64444aeea44446.........
    ..........6444aeea4446..........
    ...........666aeea666...........
    ...........666aeea666...........
    ..........6444aeea4446..........
    .........64444aeea44446.........
    ........6444699999964446........
    .......6444649aaaa9464446.......
    ......64446449999994464446......
    .....6444644421991244464446.....
    ....644464446229922644464446....
    ...644464446........644464446...
    ..644464446..........644464446..
    .644464446............644464446.
    644464446..............644464446
    44464446................64446444
    4464446..................6444644
    464446....................644464
    64446......................64446
    `, "X-BLADE", 40, 5)]
CameraAnchor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
BattlePositionX = 30
battlePositionY = 20
OpenOverworld()
