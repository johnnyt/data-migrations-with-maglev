# Data Migrations With MagLev

MagLev is a Ruby implementation than runs on top of the GemStone/S Smalltalk VM.
It can transparently manage a large amount (petabytes) of data and has a scalable
built-in model for parallelism across VMs. Since *all* connected VMs see the same
objects, it can have thousands of truly parallel processes running in a single,
shared, transactional object space.

MagLev isn't a Ruby VM with an integrated NoSQL database, it's a pure object
database that uses Ruby for its data manipulation language.

## Project Setup

    git clone https://github.com/johnnyt/data-migrations-with-maglev.git
    cd data-migrations-with-maglev
    ./script/setup
