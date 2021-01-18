# frozen_string_literal: true

Product.destroy_all
Product.create(name: 'Scubapro S600', price: 599, image: './images/s600.jpg')
Product.create(name: 'Scubapro MK25', price: 399, image: './images/mk25.jpg')
Product.create(name: 'Scubapro Hydros Pro BCD', price: 999, image: './images/hydros.jpg')
Product.create(name: 'Scubapro Jet Sport Fins', price: 75, image: './images/fins.jpg')
Product.create(name: 'Hollis M1 Mask', price: 59, image: './images/mask.jpg')
Product.create(name: 'Scubapro Wetsuit', price: 150, image: './images/wetsuit.jpg')
Product.create(name: 'Cressi Snorkel', price: 39, image: './images/snorkel.jpg')
Product.create(name: 'Shearwater Perdix Dive Computer', price: 499, image: './images/perdix.jpg')
Product.create(name: 'Shearwater Perdix Wireless Transmitter', price: 199, image: './images/transmitter.jpg')
Product.create(name: 'Diver Down Flag', price: 29, image: './images/flag.jpg')
Product.create(name: '75 ft Reel w/ carabiner', price: 15, image: './images/reel.jpg')
Product.create(name: 'Scubapro S600', price: 899, image: './images/s600mk25.jpg')
Product.create(name: 'Save a Dive Kit', price: 49, image: './images/save_a_dive.jpg')
Product.create(name: 'Mares MV Octo', price: 89, image: './images/octo.jpg')
Product.create(name: 'Scubapro Presure and Depth Guage', price: 199, image: './images/guage.jpg')
puts "#{Product.count} entries created."
