#!/usr/bin/env bash

###################################################################################
# COMMON
###################################################################################

export DEBIAN_FRONTEND=noninteractive

# install locale 
locale-gen --purge ru_RU.UTF-8
#echo -e 'LANG="ru_RU.UTF-8"\nLC_ALL="ru_RU.UTF-8"\nLC_NUMERIC="C"' > /etc/default/locale
echo -e 'LANG="ru_RU.UTF-8"' > /etc/default/locale
timedatectl set-timezone UTC --no-ask-password

#common 
apt-get install -y curl gnupg2 ca-certificates lsb-release software-properties-common git mc sshfs

###################################################################################
# PPAs
###################################################################################

# add nginx ppa
echo "deb http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" | tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | apt-key add -

# nodejs ppa
curl -sL https://deb.nodesource.com/setup_14.x | bash

###################################################################################
# INSTALL PACKAGES
###################################################################################
apt-get update -y
apt-get upgrade -y

apt-get install --quiet --yes nginx-extras
apt-get install --quiet --yes nodejs

###################################################################################
# CONFIGURE NGINX
###################################################################################
sed -i 's/user www-data/user vagrant/g' /etc/nginx/nginx.conf
ln -s /var/www/ds-mi/vagrant/nginx/ds-mi.vagrant /etc/nginx/sites-enabled/ds-mi.vagrant

###################################################################################
# GLOBAL NODE MODULES
###################################################################################
npm install --global gulp-cli