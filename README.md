# webcomic.js
Webcomic.js is a newborn, alpha-stage content management system for publishing comics online.  Which is to say it's a program that sends webcomic pages to a web browser!  This page is primarily for web developers who are interested in testing/using Webcomic.js.  There currently is no point-and-click easy installer, partly because webcomic.js is so new.

If you're not into that, that's okay!  Feel free to read through the documentation if you're the curious sort, or [go back to the comic](http://nebula-ice.erki.net/).

Webcomic.js runs on Node.js Express, with dependencies including GraphicsMagick and Multer.  It currently provides a half-finished api for clean access, and will respond to manual uploads of numbered files to specific folders, i.e., putting 1.jpg into the pages folder will cause this page to appear on the site.

This is not just a framework; the next stage of development for webcomic.js will involve the creation of a browser-based frontend for easy point-and-click content management.

## Installing
Clone from Github, then run.

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

You might have to install some extra dependencies, but those aren't documented, yet, except that you definitely need GraphicsMagick, which is used for thumbnail generation.

You'll also want to make a thumbnail directory:
	
	mkdir thumb

as well as a pages directory in the public folder:
	
	mkdir public/pages

You can edit where Webcomic.js will look for these in lib/defaults.js.  A lot of other settings are in package.json, so be sure to check those out.

## Anatomy of Webcomic.js
.
├── app.js
├── cookies.txt
├── data
│   ├── 1.md
│   ├── 1.yaml
│   ├── 2.md
│   ├── 2.yaml
│   ├── 3.md
│   ├── 3.yaml
│   ├── 4.md
│   ├── 4.yaml
│   ├── 5.md
│   └── 5.yaml
├── desc.md
├── docs
│   └── API.md
├── lib
│   ├── defaults.js
│   ├── fileGrep.js
│   └── useful.js
├── LICENSE
├── log.txt
├── notes-on-comic.txt
├── package.json
├── pages_backup.zip
├── public
│   ├── icon
│   │   ├── glyphicons_free
│   │   │   ├── _changelog.txt
│   │   │   ├── glyphicons
│   │   │   │   └── png
│   │   │   │       ├── glyphicons-100-vector-path-all.png
│   │   │   │       ├── glyphicons-101-font.png
│   │   │   │       ├── glyphicons-102-italic.png
│   │   │   │       ├── glyphicons-103-bold.png
│   │   │   │       ├── glyphicons-104-text-underline.png
│   │   │   │       ├── glyphicons-105-text-strike.png
│   │   │   │       ├── glyphicons-106-text-height.png
│   │   │   │       ├── glyphicons-107-text-width.png
│   │   │   │       ├── glyphicons-108-text-resize.png
│   │   │   │       ├── glyphicons-109-left-indent.png
│   │   │   │       ├── glyphicons-10-magic.png
│   │   │   │       ├── glyphicons-110-right-indent.png
│   │   │   │       ├── glyphicons-111-align-left.png
│   │   │   │       ├── glyphicons-112-align-center.png
│   │   │   │       ├── glyphicons-113-align-right.png
│   │   │   │       ├── glyphicons-114-justify.png
│   │   │   │       ├── glyphicons-115-list.png
│   │   │   │       ├── glyphicons-116-text-smaller.png
│   │   │   │       ├── glyphicons-117-text-bigger.png
│   │   │   │       ├── glyphicons-118-embed.png
│   │   │   │       ├── glyphicons-119-embed-close.png
│   │   │   │       ├── glyphicons-11-envelope.png
│   │   │   │       ├── glyphicons-120-table.png
│   │   │   │       ├── glyphicons-121-message-full.png
│   │   │   │       ├── glyphicons-122-message-empty.png
│   │   │   │       ├── glyphicons-123-message-in.png
│   │   │   │       ├── glyphicons-124-message-out.png
│   │   │   │       ├── glyphicons-125-message-plus.png
│   │   │   │       ├── glyphicons-126-message-minus.png
│   │   │   │       ├── glyphicons-127-message-ban.png
│   │   │   │       ├── glyphicons-128-message-flag.png
│   │   │   │       ├── glyphicons-129-message-lock.png
│   │   │   │       ├── glyphicons-12-camera.png
│   │   │   │       ├── glyphicons-130-message-new.png
│   │   │   │       ├── glyphicons-131-inbox.png
│   │   │   │       ├── glyphicons-132-inbox-plus.png
│   │   │   │       ├── glyphicons-133-inbox-minus.png
│   │   │   │       ├── glyphicons-134-inbox-lock.png
│   │   │   │       ├── glyphicons-135-inbox-in.png
│   │   │   │       ├── glyphicons-136-inbox-out.png
│   │   │   │       ├── glyphicons-137-cogwheel.png
│   │   │   │       ├── glyphicons-138-cogwheels.png
│   │   │   │       ├── glyphicons-139-picture.png
│   │   │   │       ├── glyphicons-13-heart.png
│   │   │   │       ├── glyphicons-140-adjust-alt.png
│   │   │   │       ├── glyphicons-141-database-lock.png
│   │   │   │       ├── glyphicons-142-database-plus.png
│   │   │   │       ├── glyphicons-143-database-minus.png
│   │   │   │       ├── glyphicons-144-database-ban.png
│   │   │   │       ├── glyphicons-145-folder-open.png
│   │   │   │       ├── glyphicons-146-folder-plus.png
│   │   │   │       ├── glyphicons-147-folder-minus.png
│   │   │   │       ├── glyphicons-148-folder-lock.png
│   │   │   │       ├── glyphicons-149-folder-flag.png
│   │   │   │       ├── glyphicons-14-beach-umbrella.png
│   │   │   │       ├── glyphicons-150-folder-new.png
│   │   │   │       ├── glyphicons-151-edit.png
│   │   │   │       ├── glyphicons-152-new-window.png
│   │   │   │       ├── glyphicons-153-check.png
│   │   │   │       ├── glyphicons-154-unchecked.png
│   │   │   │       ├── glyphicons-155-more-windows.png
│   │   │   │       ├── glyphicons-156-show-big-thumbnails.png
│   │   │   │       ├── glyphicons-157-show-thumbnails.png
│   │   │   │       ├── glyphicons-158-show-thumbnails-with-lines.png
│   │   │   │       ├── glyphicons-159-show-lines.png
│   │   │   │       ├── glyphicons-15-train.png
│   │   │   │       ├── glyphicons-160-playlist.png
│   │   │   │       ├── glyphicons-161-imac.png
│   │   │   │       ├── glyphicons-162-macbook.png
│   │   │   │       ├── glyphicons-163-ipad.png
│   │   │   │       ├── glyphicons-164-iphone.png
│   │   │   │       ├── glyphicons-165-iphone-transfer.png
│   │   │   │       ├── glyphicons-166-iphone-exchange.png
│   │   │   │       ├── glyphicons-167-ipod.png
│   │   │   │       ├── glyphicons-168-ipod-shuffle.png
│   │   │   │       ├── glyphicons-169-ear-plugs.png
│   │   │   │       ├── glyphicons-16-print.png
│   │   │   │       ├── glyphicons-170-record.png
│   │   │   │       ├── glyphicons-171-step-backward.png
│   │   │   │       ├── glyphicons-172-fast-backward.png
│   │   │   │       ├── glyphicons-173-rewind.png
│   │   │   │       ├── glyphicons-174-play.png
│   │   │   │       ├── glyphicons-175-pause.png
│   │   │   │       ├── glyphicons-176-stop.png
│   │   │   │       ├── glyphicons-177-forward.png
│   │   │   │       ├── glyphicons-178-fast-forward.png
│   │   │   │       ├── glyphicons-179-step-forward.png
│   │   │   │       ├── glyphicons-17-bin.png
│   │   │   │       ├── glyphicons-180-eject.png
│   │   │   │       ├── glyphicons-181-facetime-video.png
│   │   │   │       ├── glyphicons-182-download-alt.png
│   │   │   │       ├── glyphicons-183-mute.png
│   │   │   │       ├── glyphicons-184-volume-down.png
│   │   │   │       ├── glyphicons-185-volume-up.png
│   │   │   │       ├── glyphicons-186-screenshot.png
│   │   │   │       ├── glyphicons-187-move.png
│   │   │   │       ├── glyphicons-188-more.png
│   │   │   │       ├── glyphicons-189-brightness-reduce.png
│   │   │   │       ├── glyphicons-18-music.png
│   │   │   │       ├── glyphicons-190-brightness-increase.png
│   │   │   │       ├── glyphicons-191-circle-plus.png
│   │   │   │       ├── glyphicons-192-circle-minus.png
│   │   │   │       ├── glyphicons-193-circle-remove.png
│   │   │   │       ├── glyphicons-194-circle-ok.png
│   │   │   │       ├── glyphicons-195-circle-question-mark.png
│   │   │   │       ├── glyphicons-196-circle-info.png
│   │   │   │       ├── glyphicons-197-circle-exclamation-mark.png
│   │   │   │       ├── glyphicons-198-remove.png
│   │   │   │       ├── glyphicons-199-ok.png
│   │   │   │       ├── glyphicons-19-note.png
│   │   │   │       ├── glyphicons-1-glass.png
│   │   │   │       ├── glyphicons-200-ban.png
│   │   │   │       ├── glyphicons-201-download.png
│   │   │   │       ├── glyphicons-202-upload.png
│   │   │   │       ├── glyphicons-203-shopping-cart.png
│   │   │   │       ├── glyphicons-204-lock.png
│   │   │   │       ├── glyphicons-205-unlock.png
│   │   │   │       ├── glyphicons-206-electricity.png
│   │   │   │       ├── glyphicons-207-ok-2.png
│   │   │   │       ├── glyphicons-208-remove-2.png
│   │   │   │       ├── glyphicons-209-cart-out.png
│   │   │   │       ├── glyphicons-20-heart-empty.png
│   │   │   │       ├── glyphicons-210-cart-in.png
│   │   │   │       ├── glyphicons-211-left-arrow.png
│   │   │   │       ├── glyphicons-212-right-arrow.png
│   │   │   │       ├── glyphicons-213-down-arrow.png
│   │   │   │       ├── glyphicons-214-up-arrow.png
│   │   │   │       ├── glyphicons-215-resize-small.png
│   │   │   │       ├── glyphicons-216-resize-full.png
│   │   │   │       ├── glyphicons-217-circle-arrow-left.png
│   │   │   │       ├── glyphicons-218-circle-arrow-right.png
│   │   │   │       ├── glyphicons-219-circle-arrow-top.png
│   │   │   │       ├── glyphicons-21-home.png
│   │   │   │       ├── glyphicons-220-circle-arrow-down.png
│   │   │   │       ├── glyphicons-221-play-button.png
│   │   │   │       ├── glyphicons-222-unshare.png
│   │   │   │       ├── glyphicons-223-share.png
│   │   │   │       ├── glyphicons-224-chevron-right.png
│   │   │   │       ├── glyphicons-225-chevron-left.png
│   │   │   │       ├── glyphicons-226-bluetooth.png
│   │   │   │       ├── glyphicons-227-euro.png
│   │   │   │       ├── glyphicons-228-usd.png
│   │   │   │       ├── glyphicons-229-gbp.png
│   │   │   │       ├── glyphicons-22-snowflake.png
│   │   │   │       ├── glyphicons-230-retweet-2.png
│   │   │   │       ├── glyphicons-231-moon.png
│   │   │   │       ├── glyphicons-232-sun.png
│   │   │   │       ├── glyphicons-233-cloud.png
│   │   │   │       ├── glyphicons-234-direction.png
│   │   │   │       ├── glyphicons-235-brush.png
│   │   │   │       ├── glyphicons-236-pen.png
│   │   │   │       ├── glyphicons-237-zoom-in.png
│   │   │   │       ├── glyphicons-238-zoom-out.png
│   │   │   │       ├── glyphicons-239-pin.png
│   │   │   │       ├── glyphicons-23-fire.png
│   │   │   │       ├── glyphicons-240-albums.png
│   │   │   │       ├── glyphicons-241-rotation-lock.png
│   │   │   │       ├── glyphicons-242-flash.png
│   │   │   │       ├── glyphicons-243-google-maps.png
│   │   │   │       ├── glyphicons-244-anchor.png
│   │   │   │       ├── glyphicons-245-conversation.png
│   │   │   │       ├── glyphicons-246-chat.png
│   │   │   │       ├── glyphicons-247-male.png
│   │   │   │       ├── glyphicons-248-female.png
│   │   │   │       ├── glyphicons-249-asterisk.png
│   │   │   │       ├── glyphicons-24-magnet.png
│   │   │   │       ├── glyphicons-250-divide.png
│   │   │   │       ├── glyphicons-251-snorkel-diving.png
│   │   │   │       ├── glyphicons-252-scuba-diving.png
│   │   │   │       ├── glyphicons-253-oxygen-bottle.png
│   │   │   │       ├── glyphicons-254-fins.png
│   │   │   │       ├── glyphicons-255-fishes.png
│   │   │   │       ├── glyphicons-256-boat.png
│   │   │   │       ├── glyphicons-257-delete.png
│   │   │   │       ├── glyphicons-258-sheriffs-star.png
│   │   │   │       ├── glyphicons-259-qrcode.png
│   │   │   │       ├── glyphicons-25-parents.png
│   │   │   │       ├── glyphicons-260-barcode.png
│   │   │   │       ├── glyphicons-261-pool.png
│   │   │   │       ├── glyphicons-262-buoy.png
│   │   │   │       ├── glyphicons-263-spade.png
│   │   │   │       ├── glyphicons-264-bank.png
│   │   │   │       ├── glyphicons-265-vcard.png
│   │   │   │       ├── glyphicons-266-electrical-plug.png
│   │   │   │       ├── glyphicons-267-flag.png
│   │   │   │       ├── glyphicons-268-credit-card.png
│   │   │   │       ├── glyphicons-269-keyboard-wireless.png
│   │   │   │       ├── glyphicons-26-binoculars.png
│   │   │   │       ├── glyphicons-270-keyboard-wired.png
│   │   │   │       ├── glyphicons-271-shield.png
│   │   │   │       ├── glyphicons-272-ring.png
│   │   │   │       ├── glyphicons-273-cake.png
│   │   │   │       ├── glyphicons-274-drink.png
│   │   │   │       ├── glyphicons-275-beer.png
│   │   │   │       ├── glyphicons-276-fast-food.png
│   │   │   │       ├── glyphicons-277-cutlery.png
│   │   │   │       ├── glyphicons-278-pizza.png
│   │   │   │       ├── glyphicons-279-birthday-cake.png
│   │   │   │       ├── glyphicons-27-road.png
│   │   │   │       ├── glyphicons-280-tablet.png
│   │   │   │       ├── glyphicons-281-settings.png
│   │   │   │       ├── glyphicons-282-bullets.png
│   │   │   │       ├── glyphicons-283-cardio.png
│   │   │   │       ├── glyphicons-284-t-shirt.png
│   │   │   │       ├── glyphicons-285-pants.png
│   │   │   │       ├── glyphicons-286-sweater.png
│   │   │   │       ├── glyphicons-287-fabric.png
│   │   │   │       ├── glyphicons-288-leather.png
│   │   │   │       ├── glyphicons-289-scissors.png
│   │   │   │       ├── glyphicons-28-search.png
│   │   │   │       ├── glyphicons-290-bomb.png
│   │   │   │       ├── glyphicons-291-skull.png
│   │   │   │       ├── glyphicons-292-celebration.png
│   │   │   │       ├── glyphicons-293-tea-kettle.png
│   │   │   │       ├── glyphicons-294-french-press.png
│   │   │   │       ├── glyphicons-295-coffee-cup.png
│   │   │   │       ├── glyphicons-296-pot.png
│   │   │   │       ├── glyphicons-297-grater.png
│   │   │   │       ├── glyphicons-298-kettle.png
│   │   │   │       ├── glyphicons-299-hospital.png
│   │   │   │       ├── glyphicons-29-cars.png
│   │   │   │       ├── glyphicons-2-leaf.png
│   │   │   │       ├── glyphicons-300-hospital-h.png
│   │   │   │       ├── glyphicons-301-microphone.png
│   │   │   │       ├── glyphicons-302-webcam.png
│   │   │   │       ├── glyphicons-303-temple-christianity-church.png
│   │   │   │       ├── glyphicons-304-temple-islam.png
│   │   │   │       ├── glyphicons-305-temple-hindu.png
│   │   │   │       ├── glyphicons-306-temple-buddhist.png
│   │   │   │       ├── glyphicons-307-bicycle.png
│   │   │   │       ├── glyphicons-308-life-preserver.png
│   │   │   │       ├── glyphicons-309-share-alt.png
│   │   │   │       ├── glyphicons-30-notes-2.png
│   │   │   │       ├── glyphicons-310-comments.png
│   │   │   │       ├── glyphicons-311-flower.png
│   │   │   │       ├── glyphicons-312-baseball.png
│   │   │   │       ├── glyphicons-313-rugby.png
│   │   │   │       ├── glyphicons-314-ax.png
│   │   │   │       ├── glyphicons-315-table-tennis.png
│   │   │   │       ├── glyphicons-316-bowling.png
│   │   │   │       ├── glyphicons-317-tree-conifer.png
│   │   │   │       ├── glyphicons-318-tree-deciduous.png
│   │   │   │       ├── glyphicons-319-more-items.png
│   │   │   │       ├── glyphicons-31-pencil.png
│   │   │   │       ├── glyphicons-320-sort.png
│   │   │   │       ├── glyphicons-321-filter.png
│   │   │   │       ├── glyphicons-322-gamepad.png
│   │   │   │       ├── glyphicons-323-playing-dices.png
│   │   │   │       ├── glyphicons-324-calculator.png
│   │   │   │       ├── glyphicons-325-tie.png
│   │   │   │       ├── glyphicons-326-wallet.png
│   │   │   │       ├── glyphicons-327-piano.png
│   │   │   │       ├── glyphicons-328-sampler.png
│   │   │   │       ├── glyphicons-329-podium.png
│   │   │   │       ├── glyphicons-32-bus.png
│   │   │   │       ├── glyphicons-330-soccer-ball.png
│   │   │   │       ├── glyphicons-331-blog.png
│   │   │   │       ├── glyphicons-332-dashboard.png
│   │   │   │       ├── glyphicons-333-certificate.png
│   │   │   │       ├── glyphicons-334-bell.png
│   │   │   │       ├── glyphicons-335-candle.png
│   │   │   │       ├── glyphicons-336-pushpin.png
│   │   │   │       ├── glyphicons-337-iphone-shake.png
│   │   │   │       ├── glyphicons-338-pin-flag.png
│   │   │   │       ├── glyphicons-339-turtle.png
│   │   │   │       ├── glyphicons-33-wifi-alt.png
│   │   │   │       ├── glyphicons-340-rabbit.png
│   │   │   │       ├── glyphicons-341-globe.png
│   │   │   │       ├── glyphicons-342-briefcase.png
│   │   │   │       ├── glyphicons-343-hdd.png
│   │   │   │       ├── glyphicons-344-thumbs-up.png
│   │   │   │       ├── glyphicons-345-thumbs-down.png
│   │   │   │       ├── glyphicons-346-hand-right.png
│   │   │   │       ├── glyphicons-347-hand-left.png
│   │   │   │       ├── glyphicons-348-hand-up.png
│   │   │   │       ├── glyphicons-349-hand-down.png
│   │   │   │       ├── glyphicons-34-luggage.png
│   │   │   │       ├── glyphicons-350-fullscreen.png
│   │   │   │       ├── glyphicons-351-shopping-bag.png
│   │   │   │       ├── glyphicons-352-book-open.png
│   │   │   │       ├── glyphicons-353-nameplate.png
│   │   │   │       ├── glyphicons-354-nameplate-alt.png
│   │   │   │       ├── glyphicons-355-vases.png
│   │   │   │       ├── glyphicons-356-bullhorn.png
│   │   │   │       ├── glyphicons-357-dumbbell.png
│   │   │   │       ├── glyphicons-358-suitcase.png
│   │   │   │       ├── glyphicons-359-file-import.png
│   │   │   │       ├── glyphicons-35-old-man.png
│   │   │   │       ├── glyphicons-360-file-export.png
│   │   │   │       ├── glyphicons-361-bug.png
│   │   │   │       ├── glyphicons-362-crown.png
│   │   │   │       ├── glyphicons-363-smoking.png
│   │   │   │       ├── glyphicons-364-cloud-download.png
│   │   │   │       ├── glyphicons-365-cloud-upload.png
│   │   │   │       ├── glyphicons-366-restart.png
│   │   │   │       ├── glyphicons-367-security-camera.png
│   │   │   │       ├── glyphicons-368-expand.png
│   │   │   │       ├── glyphicons-369-collapse.png
│   │   │   │       ├── glyphicons-36-woman.png
│   │   │   │       ├── glyphicons-370-collapse-top.png
│   │   │   │       ├── glyphicons-371-globe-af.png
│   │   │   │       ├── glyphicons-372-global.png
│   │   │   │       ├── glyphicons-373-spray.png
│   │   │   │       ├── glyphicons-374-nails.png
│   │   │   │       ├── glyphicons-375-claw-hammer.png
│   │   │   │       ├── glyphicons-376-classic-hammer.png
│   │   │   │       ├── glyphicons-377-hand-saw.png
│   │   │   │       ├── glyphicons-378-riflescope.png
│   │   │   │       ├── glyphicons-379-electrical-socket-eu.png
│   │   │   │       ├── glyphicons-37-file.png
│   │   │   │       ├── glyphicons-380-electrical-socket-us.png
│   │   │   │       ├── glyphicons-381-message-forward.png
│   │   │   │       ├── glyphicons-382-coat-hanger.png
│   │   │   │       ├── glyphicons-383-dress.png
│   │   │   │       ├── glyphicons-384-bathrobe.png
│   │   │   │       ├── glyphicons-385-shirt.png
│   │   │   │       ├── glyphicons-386-underwear.png
│   │   │   │       ├── glyphicons-387-log-in.png
│   │   │   │       ├── glyphicons-388-log-out.png
│   │   │   │       ├── glyphicons-389-exit.png
│   │   │   │       ├── glyphicons-38-coins.png
│   │   │   │       ├── glyphicons-390-new-window-alt.png
│   │   │   │       ├── glyphicons-391-video-sd.png
│   │   │   │       ├── glyphicons-392-video-hd.png
│   │   │   │       ├── glyphicons-393-subtitles.png
│   │   │   │       ├── glyphicons-394-sound-stereo.png
│   │   │   │       ├── glyphicons-395-sound-dolby.png
│   │   │   │       ├── glyphicons-396-sound-5-1.png
│   │   │   │       ├── glyphicons-397-sound-6-1.png
│   │   │   │       ├── glyphicons-398-sound-7-1.png
│   │   │   │       ├── glyphicons-399-copyright-mark.png
│   │   │   │       ├── glyphicons-39-airplane.png
│   │   │   │       ├── glyphicons-3-dog.png
│   │   │   │       ├── glyphicons-400-registration-mark.png
│   │   │   │       ├── glyphicons-401-radar.png
│   │   │   │       ├── glyphicons-402-skateboard.png
│   │   │   │       ├── glyphicons-403-golf-course.png
│   │   │   │       ├── glyphicons-404-sorting.png
│   │   │   │       ├── glyphicons-405-sort-by-alphabet.png
│   │   │   │       ├── glyphicons-406-sort-by-alphabet-alt.png
│   │   │   │       ├── glyphicons-407-sort-by-order.png
│   │   │   │       ├── glyphicons-408-sort-by-order-alt.png
│   │   │   │       ├── glyphicons-409-sort-by-attributes.png
│   │   │   │       ├── glyphicons-40-notes.png
│   │   │   │       ├── glyphicons-410-sort-by-attributes-alt.png
│   │   │   │       ├── glyphicons-411-compressed.png
│   │   │   │       ├── glyphicons-412-package.png
│   │   │   │       ├── glyphicons-413-cloud-plus.png
│   │   │   │       ├── glyphicons-414-cloud-minus.png
│   │   │   │       ├── glyphicons-415-disk-save.png
│   │   │   │       ├── glyphicons-416-disk-open.png
│   │   │   │       ├── glyphicons-417-disk-saved.png
│   │   │   │       ├── glyphicons-418-disk-remove.png
│   │   │   │       ├── glyphicons-419-disk-import.png
│   │   │   │       ├── glyphicons-41-stats.png
│   │   │   │       ├── glyphicons-420-disk-export.png
│   │   │   │       ├── glyphicons-421-tower.png
│   │   │   │       ├── glyphicons-422-send.png
│   │   │   │       ├── glyphicons-423-git-branch.png
│   │   │   │       ├── glyphicons-424-git-create.png
│   │   │   │       ├── glyphicons-425-git-private.png
│   │   │   │       ├── glyphicons-426-git-delete.png
│   │   │   │       ├── glyphicons-427-git-merge.png
│   │   │   │       ├── glyphicons-428-git-pull-request.png
│   │   │   │       ├── glyphicons-429-git-compare.png
│   │   │   │       ├── glyphicons-42-charts.png
│   │   │   │       ├── glyphicons-430-git-commit.png
│   │   │   │       ├── glyphicons-431-construction-cone.png
│   │   │   │       ├── glyphicons-432-shoe-steps.png
│   │   │   │       ├── glyphicons-433-plus.png
│   │   │   │       ├── glyphicons-434-minus.png
│   │   │   │       ├── glyphicons-435-redo.png
│   │   │   │       ├── glyphicons-436-undo.png
│   │   │   │       ├── glyphicons-437-golf.png
│   │   │   │       ├── glyphicons-438-hockey.png
│   │   │   │       ├── glyphicons-439-pipe.png
│   │   │   │       ├── glyphicons-43-pie-chart.png
│   │   │   │       ├── glyphicons-440-wrench.png
│   │   │   │       ├── glyphicons-441-folder-closed.png
│   │   │   │       ├── glyphicons-442-phone-alt.png
│   │   │   │       ├── glyphicons-443-earphone.png
│   │   │   │       ├── glyphicons-444-floppy-disk.png
│   │   │   │       ├── glyphicons-445-floppy-saved.png
│   │   │   │       ├── glyphicons-446-floppy-remove.png
│   │   │   │       ├── glyphicons-447-floppy-save.png
│   │   │   │       ├── glyphicons-448-floppy-open.png
│   │   │   │       ├── glyphicons-449-translate.png
│   │   │   │       ├── glyphicons-44-group.png
│   │   │   │       ├── glyphicons-450-fax.png
│   │   │   │       ├── glyphicons-451-factory.png
│   │   │   │       ├── glyphicons-452-shop-window.png
│   │   │   │       ├── glyphicons-453-shop.png
│   │   │   │       ├── glyphicons-454-kiosk.png
│   │   │   │       ├── glyphicons-455-kiosk-wheels.png
│   │   │   │       ├── glyphicons-456-kiosk-light.png
│   │   │   │       ├── glyphicons-457-kiosk-food.png
│   │   │   │       ├── glyphicons-458-transfer.png
│   │   │   │       ├── glyphicons-459-money.png
│   │   │   │       ├── glyphicons-45-keys.png
│   │   │   │       ├── glyphicons-460-header.png
│   │   │   │       ├── glyphicons-461-blacksmith.png
│   │   │   │       ├── glyphicons-462-saw-blade.png
│   │   │   │       ├── glyphicons-463-basketball.png
│   │   │   │       ├── glyphicons-464-server.png
│   │   │   │       ├── glyphicons-465-server-plus.png
│   │   │   │       ├── glyphicons-466-server-minus.png
│   │   │   │       ├── glyphicons-467-server-ban.png
│   │   │   │       ├── glyphicons-468-server-flag.png
│   │   │   │       ├── glyphicons-469-server-lock.png
│   │   │   │       ├── glyphicons-46-calendar.png
│   │   │   │       ├── glyphicons-470-server-new.png
│   │   │   │       ├── glyphicons-471-elec-station.png
│   │   │   │       ├── glyphicons-472-gas-station.png
│   │   │   │       ├── glyphicons-473-target.png
│   │   │   │       ├── glyphicons-474-bed-alt.png
│   │   │   │       ├── glyphicons-475-mosquito-net.png
│   │   │   │       ├── glyphicons-476-dining-set.png
│   │   │   │       ├── glyphicons-477-plate-of-food.png
│   │   │   │       ├── glyphicons-478-hygiene-kit.png
│   │   │   │       ├── glyphicons-479-blackboard.png
│   │   │   │       ├── glyphicons-47-router.png
│   │   │   │       ├── glyphicons-480-marriage.png
│   │   │   │       ├── glyphicons-481-bucket.png
│   │   │   │       ├── glyphicons-482-none-color-swatch.png
│   │   │   │       ├── glyphicons-483-bring-forward.png
│   │   │   │       ├── glyphicons-484-bring-to-front.png
│   │   │   │       ├── glyphicons-485-send-backward.png
│   │   │   │       ├── glyphicons-486-send-to-back.png
│   │   │   │       ├── glyphicons-487-fit-frame-to-image.png
│   │   │   │       ├── glyphicons-488-fit-image-to-frame.png
│   │   │   │       ├── glyphicons-489-multiple-displays.png
│   │   │   │       ├── glyphicons-48-camera-small.png
│   │   │   │       ├── glyphicons-490-handshake.png
│   │   │   │       ├── glyphicons-491-child.png
│   │   │   │       ├── glyphicons-492-baby-formula.png
│   │   │   │       ├── glyphicons-493-medicine.png
│   │   │   │       ├── glyphicons-494-atv-vehicle.png
│   │   │   │       ├── glyphicons-495-motorcycle.png
│   │   │   │       ├── glyphicons-496-bed.png
│   │   │   │       ├── glyphicons-497-tent.png
│   │   │   │       ├── glyphicons-498-glasses.png
│   │   │   │       ├── glyphicons-499-sunglasses.png
│   │   │   │       ├── glyphicons-49-star-empty.png
│   │   │   │       ├── glyphicons-4-user.png
│   │   │   │       ├── glyphicons-500-family.png
│   │   │   │       ├── glyphicons-501-education.png
│   │   │   │       ├── glyphicons-502-shoes.png
│   │   │   │       ├── glyphicons-503-map.png
│   │   │   │       ├── glyphicons-504-cd.png
│   │   │   │       ├── glyphicons-505-alert.png
│   │   │   │       ├── glyphicons-506-piggy-bank.png
│   │   │   │       ├── glyphicons-507-star-half.png
│   │   │   │       ├── glyphicons-508-cluster.png
│   │   │   │       ├── glyphicons-509-flowchart.png
│   │   │   │       ├── glyphicons-50-star.png
│   │   │   │       ├── glyphicons-510-commodities.png
│   │   │   │       ├── glyphicons-511-duplicate.png
│   │   │   │       ├── glyphicons-512-copy.png
│   │   │   │       ├── glyphicons-513-paste.png
│   │   │   │       ├── glyphicons-514-bath-bathtub.png
│   │   │   │       ├── glyphicons-515-bath-shower.png
│   │   │   │       ├── glyphicons-516-shower.png
│   │   │   │       ├── glyphicons-517-menu-hamburger.png
│   │   │   │       ├── glyphicons-518-option-vertical.png
│   │   │   │       ├── glyphicons-519-option-horizontal.png
│   │   │   │       ├── glyphicons-51-link.png
│   │   │   │       ├── glyphicons-520-currency-conversion.png
│   │   │   │       ├── glyphicons-521-user-ban.png
│   │   │   │       ├── glyphicons-522-user-lock.png
│   │   │   │       ├── glyphicons-523-user-flag.png
│   │   │   │       ├── glyphicons-524-user-asterisk.png
│   │   │   │       ├── glyphicons-525-user-alert.png
│   │   │   │       ├── glyphicons-526-user-key.png
│   │   │   │       ├── glyphicons-527-user-conversation.png
│   │   │   │       ├── glyphicons-528-database.png
│   │   │   │       ├── glyphicons-529-database-search.png
│   │   │   │       ├── glyphicons-52-eye-open.png
│   │   │   │       ├── glyphicons-530-list-alt.png
│   │   │   │       ├── glyphicons-531-hazard-sign.png
│   │   │   │       ├── glyphicons-532-hazard.png
│   │   │   │       ├── glyphicons-533-stop-sign.png
│   │   │   │       ├── glyphicons-534-lab.png
│   │   │   │       ├── glyphicons-535-lab-alt.png
│   │   │   │       ├── glyphicons-536-ice-cream.png
│   │   │   │       ├── glyphicons-537-ice-lolly.png
│   │   │   │       ├── glyphicons-538-ice-lolly-tasted.png
│   │   │   │       ├── glyphicons-539-invoice.png
│   │   │   │       ├── glyphicons-53-eye-close.png
│   │   │   │       ├── glyphicons-540-cart-tick.png
│   │   │   │       ├── glyphicons-541-hourglass.png
│   │   │   │       ├── glyphicons-542-cat.png
│   │   │   │       ├── glyphicons-543-lamp.png
│   │   │   │       ├── glyphicons-544-scale-classic.png
│   │   │   │       ├── glyphicons-545-eye-plus.png
│   │   │   │       ├── glyphicons-546-eye-minus.png
│   │   │   │       ├── glyphicons-547-quote.png
│   │   │   │       ├── glyphicons-548-bitcoin.png
│   │   │   │       ├── glyphicons-549-yen.png
│   │   │   │       ├── glyphicons-54-alarm.png
│   │   │   │       ├── glyphicons-550-ruble.png
│   │   │   │       ├── glyphicons-551-erase.png
│   │   │   │       ├── glyphicons-552-podcast.png
│   │   │   │       ├── glyphicons-553-firework.png
│   │   │   │       ├── glyphicons-554-scale.png
│   │   │   │       ├── glyphicons-555-king.png
│   │   │   │       ├── glyphicons-556-queen.png
│   │   │   │       ├── glyphicons-557-pawn.png
│   │   │   │       ├── glyphicons-558-bishop.png
│   │   │   │       ├── glyphicons-559-knight.png
│   │   │   │       ├── glyphicons-55-clock.png
│   │   │   │       ├── glyphicons-560-mic-mute.png
│   │   │   │       ├── glyphicons-561-voicemail.png
│   │   │   │       ├── glyphicons-562-paragraph.png
│   │   │   │       ├── glyphicons-563-person-walking.png
│   │   │   │       ├── glyphicons-564-person-wheelchair.png
│   │   │   │       ├── glyphicons-565-underground.png
│   │   │   │       ├── glyphicons-566-car-hov.png
│   │   │   │       ├── glyphicons-567-car-rental.png
│   │   │   │       ├── glyphicons-568-transport.png
│   │   │   │       ├── glyphicons-569-taxi.png
│   │   │   │       ├── glyphicons-56-stopwatch.png
│   │   │   │       ├── glyphicons-570-ice-cream-no.png
│   │   │   │       ├── glyphicons-571-uk-rat-u.png
│   │   │   │       ├── glyphicons-572-uk-rat-pg.png
│   │   │   │       ├── glyphicons-573-uk-rat-12a.png
│   │   │   │       ├── glyphicons-574-uk-rat-12.png
│   │   │   │       ├── glyphicons-575-uk-rat-15.png
│   │   │   │       ├── glyphicons-576-uk-rat-18.png
│   │   │   │       ├── glyphicons-577-uk-rat-r18.png
│   │   │   │       ├── glyphicons-578-tv.png
│   │   │   │       ├── glyphicons-579-sms.png
│   │   │   │       ├── glyphicons-57-projector.png
│   │   │   │       ├── glyphicons-580-mms.png
│   │   │   │       ├── glyphicons-581-us-rat-g.png
│   │   │   │       ├── glyphicons-582-us-rat-pg.png
│   │   │   │       ├── glyphicons-583-us-rat-pg-13.png
│   │   │   │       ├── glyphicons-584-us-rat-restricted.png
│   │   │   │       ├── glyphicons-585-us-rat-no-one-17.png
│   │   │   │       ├── glyphicons-586-equalizer.png
│   │   │   │       ├── glyphicons-587-speakers.png
│   │   │   │       ├── glyphicons-588-remote-control.png
│   │   │   │       ├── glyphicons-589-remote-control-tv.png
│   │   │   │       ├── glyphicons-58-history.png
│   │   │   │       ├── glyphicons-590-shredder.png
│   │   │   │       ├── glyphicons-591-folder-heart.png
│   │   │   │       ├── glyphicons-592-person-running.png
│   │   │   │       ├── glyphicons-593-person.png
│   │   │   │       ├── glyphicons-594-voice.png
│   │   │   │       ├── glyphicons-595-stethoscope.png
│   │   │   │       ├── glyphicons-596-hotspot.png
│   │   │   │       ├── glyphicons-597-activity.png
│   │   │   │       ├── glyphicons-598-watch.png
│   │   │   │       ├── glyphicons-599-scissors-alt.png
│   │   │   │       ├── glyphicons-59-truck.png
│   │   │   │       ├── glyphicons-5-girl.png
│   │   │   │       ├── glyphicons-600-car-wheel.png
│   │   │   │       ├── glyphicons-601-chevron-up.png
│   │   │   │       ├── glyphicons-602-chevron-down.png
│   │   │   │       ├── glyphicons-603-superscript.png
│   │   │   │       ├── glyphicons-604-subscript.png
│   │   │   │       ├── glyphicons-605-text-size.png
│   │   │   │       ├── glyphicons-606-text-color.png
│   │   │   │       ├── glyphicons-607-text-background.png
│   │   │   │       ├── glyphicons-608-modal-window.png
│   │   │   │       ├── glyphicons-609-newspaper.png
│   │   │   │       ├── glyphicons-60-cargo.png
│   │   │   │       ├── glyphicons-610-tractor.png
│   │   │   │       ├── glyphicons-61-compass.png
│   │   │   │       ├── glyphicons-62-keynote.png
│   │   │   │       ├── glyphicons-63-paperclip.png
│   │   │   │       ├── glyphicons-64-power.png
│   │   │   │       ├── glyphicons-65-lightbulb.png
│   │   │   │       ├── glyphicons-66-tag.png
│   │   │   │       ├── glyphicons-67-tags.png
│   │   │   │       ├── glyphicons-68-cleaning.png
│   │   │   │       ├── glyphicons-69-ruler.png
│   │   │   │       ├── glyphicons-6-car.png
│   │   │   │       ├── glyphicons-70-gift.png
│   │   │   │       ├── glyphicons-71-umbrella.png
│   │   │   │       ├── glyphicons-72-book.png
│   │   │   │       ├── glyphicons-73-bookmark.png
│   │   │   │       ├── glyphicons-74-wifi.png
│   │   │   │       ├── glyphicons-75-cup.png
│   │   │   │       ├── glyphicons-76-stroller.png
│   │   │   │       ├── glyphicons-77-headphones.png
│   │   │   │       ├── glyphicons-78-headset.png
│   │   │   │       ├── glyphicons-79-warning-sign.png
│   │   │   │       ├── glyphicons-7-user-add.png
│   │   │   │       ├── glyphicons-80-signal.png
│   │   │   │       ├── glyphicons-81-retweet.png
│   │   │   │       ├── glyphicons-82-refresh.png
│   │   │   │       ├── glyphicons-83-roundabout.png
│   │   │   │       ├── glyphicons-84-random.png
│   │   │   │       ├── glyphicons-85-heat.png
│   │   │   │       ├── glyphicons-86-repeat.png
│   │   │   │       ├── glyphicons-87-display.png
│   │   │   │       ├── glyphicons-88-log-book.png
│   │   │   │       ├── glyphicons-89-address-book.png
│   │   │   │       ├── glyphicons-8-user-remove.png
│   │   │   │       ├── glyphicons-90-building.png
│   │   │   │       ├── glyphicons-91-eyedropper.png
│   │   │   │       ├── glyphicons-92-adjust.png
│   │   │   │       ├── glyphicons-93-tint.png
│   │   │   │       ├── glyphicons-94-crop.png
│   │   │   │       ├── glyphicons-95-vector-path-square.png
│   │   │   │       ├── glyphicons-96-vector-path-circle.png
│   │   │   │       ├── glyphicons-97-vector-path-polygon.png
│   │   │   │       ├── glyphicons-98-vector-path-line.png
│   │   │   │       ├── glyphicons-99-vector-path-curve.png
│   │   │   │       └── glyphicons-9-film.png
│   │   │   ├── glyphicons_social
│   │   │   │   ├── png
│   │   │   │   │   ├── social-10-wordpress.png
│   │   │   │   │   ├── social-11-instapaper.png
│   │   │   │   │   ├── social-12-evernote.png
│   │   │   │   │   ├── social-13-xing.png
│   │   │   │   │   ├── social-14-zootool.png
│   │   │   │   │   ├── social-15-dribbble.png
│   │   │   │   │   ├── social-16-deviantart.png
│   │   │   │   │   ├── social-17-read-it-later.png
│   │   │   │   │   ├── social-18-linked-in.png
│   │   │   │   │   ├── social-19-forrst.png
│   │   │   │   │   ├── social-1-pinterest.png
│   │   │   │   │   ├── social-20-pinboard.png
│   │   │   │   │   ├── social-21-behance.png
│   │   │   │   │   ├── social-22-github.png
│   │   │   │   │   ├── social-23-youtube.png
│   │   │   │   │   ├── social-24-skitch.png
│   │   │   │   │   ├── social-25-foursquare.png
│   │   │   │   │   ├── social-26-quora.png
│   │   │   │   │   ├── social-27-badoo.png
│   │   │   │   │   ├── social-28-spotify.png
│   │   │   │   │   ├── social-29-stumbleupon.png
│   │   │   │   │   ├── social-2-dropbox.png
│   │   │   │   │   ├── social-30-readability.png
│   │   │   │   │   ├── social-31-facebook.png
│   │   │   │   │   ├── social-32-twitter.png
│   │   │   │   │   ├── social-33-instagram.png
│   │   │   │   │   ├── social-34-posterous-spaces.png
│   │   │   │   │   ├── social-35-vimeo.png
│   │   │   │   │   ├── social-36-flickr.png
│   │   │   │   │   ├── social-37-last-fm.png
│   │   │   │   │   ├── social-38-rss.png
│   │   │   │   │   ├── social-39-skype.png
│   │   │   │   │   ├── social-3-google-plus.png
│   │   │   │   │   ├── social-40-e-mail.png
│   │   │   │   │   ├── social-41-vine.png
│   │   │   │   │   ├── social-42-myspace.png
│   │   │   │   │   ├── social-43-goodreads.png
│   │   │   │   │   ├── social-44-apple.png
│   │   │   │   │   ├── social-45-windows.png
│   │   │   │   │   ├── social-46-yelp.png
│   │   │   │   │   ├── social-47-playstation.png
│   │   │   │   │   ├── social-48-xbox.png
│   │   │   │   │   ├── social-49-android.png
│   │   │   │   │   ├── social-4-jolicloud.png
│   │   │   │   │   ├── social-50-ios.png
│   │   │   │   │   ├── social-51-wikipedia.png
│   │   │   │   │   ├── social-52-pocket.png
│   │   │   │   │   ├── social-53-steam.png
│   │   │   │   │   ├── social-54-souncloud.png
│   │   │   │   │   ├── social-55-slideshare.png
│   │   │   │   │   ├── social-56-netflix.png
│   │   │   │   │   ├── social-57-paypal.png
│   │   │   │   │   ├── social-58-google-drive.png
│   │   │   │   │   ├── social-59-linux-foundation.png
│   │   │   │   │   ├── social-5-yahoo.png
│   │   │   │   │   ├── social-60-ebay.png
│   │   │   │   │   ├── social-6-blogger.png
│   │   │   │   │   ├── social-7-picasa.png
│   │   │   │   │   ├── social-8-amazon.png
│   │   │   │   │   └── social-9-tumblr.png
│   │   │   │   └── psd
│   │   │   │       ├── glyphicons_social@2x.psd
│   │   │   │       ├── glyphicons_social@3x.psd
│   │   │   │       └── glyphicons_social.psd
│   │   │   └── _readme_first.txt
│   │   ├── glyphicons_free.zip
│   │   └── __MACOSX
│   │       └── glyphicons_free
│   │           ├── glyphicons
│   │           │   └── png
│   │           └── glyphicons_social
│   │               ├── png
│   │               └── psd
│   ├── javascripts
│   │   ├── admin.js
│   │   ├── disqus.js
│   │   └── jquery-2.1.3.min.js
│   ├── pages
│   │   ├── 1.svg
│   │   ├── 2.svg
│   │   ├── 3.svg
│   │   ├── 4.svg
│   │   └── 5.svg
│   ├── pages.zip
│   ├── static
│   │   └── post.html
│   └── stylesheets
│       ├── admin.css
│       ├── style.css
│       ├── style.cssold
│       └── um
├── README.md
├── routes
│   ├── admin.js
│   ├── api.js
│   ├── api.jsoldagain
│   ├── archive.js
│   ├── main.js
│   ├── rss.js
│   └── thumb.js
├── swapfiles_defunct
├── temp.js
├── thumb
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 4.png
│   └── 5.png
├── uploads
│   ├── 01aae84c4427a37233c7ef0af82bf9b2.jpg
│   ├── 0b3d89c4b83e29bf09054baa6ddaa9c6.py
│   ├── 15340e6eaae00678719cd0421f819e93.jpg
│   ├── 15ebde25108f913028276b0ebbe01050.jpg
│   ├── 24100adf6b33013ec29500e91d31d4ba.jpg
│   ├── 2dd4b9a31624bef4ebd128202b8255a1.jpg
│   ├── 40476b4abc516b39797be6cfc405deb1.jpg
│   ├── 4fb9c3e14d37fc47f607bf551f54dada.jpg
│   ├── 561f2f23abe65ade7e2b33816aff5fba.jpg
│   ├── 567881479d405104c4ec271101f3e7c4.jpg
│   ├── 59bd465edb43bf7da77b768577a23431.jpg
│   ├── 5da20942ba60c75dd7d6bcf7193d8833.jpg
│   ├── 6a0206f638175a7e09d1c0f74c0309c0.jpg
│   ├── 6e637ca540077839897b83d8883d8d21.py
│   ├── 7794f228752284434ca25bba498461c7.jpg
│   ├── 78eaefcf0b3ef79339e30fcde276a0b4.jpg
│   ├── 83d611575f2f963cbebbb3c699d88661.jpg
│   ├── 89c08822a39e6481364374cbc1cc9565.png
│   ├── 98d112e326cea3961bb990ac71c53944.jpg
│   ├── 9d3dc68c7997b94f6f9e0843c72e520e.jpg
│   ├── a4aaa7d5c6e6c4b68e10df1efe57402b.jpg
│   ├── aae0a3f5815c801851612e1f100a53e5.jpg
│   ├── bb2429d31b7fe1a9144a0a0613fe20a1.jpg
│   ├── bb5687f7f651cf56d30725b8c8b44127.jpg
│   ├── be81307f572c980c03dbbad339e4fd24.jpg
│   ├── c1b7f04766bdd397c5eb0deb9c0f4948.jpg
│   ├── c2eaa5537b135c20588757aa41caa6b3.jpg
│   ├── c68f29729b2c6bd026b8c331a7884044.jpg
│   ├── cf0bee3af6fd2ee8bc88b22d5a4c8d6a.jpg
│   ├── d4f4497078c881849962792030df957e.jpg
│   ├── dac97d13ed73ad0dd4acee36a00f94aa.jpg
│   ├── dbf3162c0e092823fb42840b4671a9c3.jpg
│   ├── dc967c5200d8dd4fa53d585fc4a6d023.jpg
│   ├── dd1ba4a77539092995eadc090e0c6717.jpg
│   ├── de74537a2d696d7db31e7a21da3dceb1.png
│   ├── e4ca3cadc677d6b71811a7b4cae4dc69.jpg
│   ├── e6329b4a33745b8ebc8c6067096f17af.jpg
│   ├── ebd5fb9d20ba511791d8e49de83b5a41.jpg
│   ├── f04dd8a2224a293f938435ea7d48c4ce.jpg
│   └── f8966a01ab00dc9d340c146d6e059289.jpg
└── views
    ├── about.jade
    ├── admin
    │   ├── login.jade
    │   ├── main-panel.jade
    │   └── panel.jade
    ├── archive.jade
    ├── error.jade
    ├── helloworld.jade
    ├── httpError.jade
    ├── includes
    │   ├── disqus.jade
    │   ├── footer.jade
    │   └── pageturn.jade
    ├── index.jade
    ├── index-old.jade
    ├── layout.jade
    ├── login.jade
    ├── page.jade
    ├── pageNotFound.jade
    ├── rss.jade
    └── upload.jade

29 directories, 785 files

## Pages
There are some sample images in the public/pages folder, with names like 1.png and 5.jpg.  Adding similarly, logically numbered images will automatically make them available on your website!

## Page Descriptions and Metadata
Page descriptions are pretty easy.  They're stored in .md files in the data folder.  This means that you can write your page description as plain text, or you can use the features of Markdown, or you can write it in pure HTML.  The plan is to create a frontend that lets you use a WYSIWYG editor to do all of this from the browser, if desired.

Page metadata is currently stored in .yaml files in the "data" folder.  Here's an example:

	name: So it begins.
	date: 23-March-2015
	tags: 
	 - office
	 - wednesday
	 - elliot
	 - jason

## API
Webcomic.js's developer API is documented [here](./docs/API.md).

## TODO
Here's the current todo list for more features:

- add more upload/download/modify features
- complete a working frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
