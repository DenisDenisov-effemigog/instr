# -*- mode: ruby -*-
# vi: set ft=ruby :

required_plugins = %w(vagrant-hostmanager vagrant-vbguest)
plugins_to_install = required_plugins.select { |plugin| not Vagrant.has_plugin? plugin }
if not plugins_to_install.empty?
    puts "Installing plugins: #{plugins_to_install.join(' ')}"
    if system "vagrant plugin install #{plugins_to_install.join(' ')}"
        exec "vagrant #{ARGV.join(' ')}"
    else
        abort "Installation of one or more plugins has failed. Aborting."
    end
end


Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"

    config.vm.provider :virtualbox do |v|
        v.name = "ds-mi.vagrant"
        v.customize [
            "modifyvm", :id,
            "--name", "ds-mi.vagrant",
            "--cpus", 1,
            "--memory", 1024,
            "--natdnshostresolver1", "on",
            "--natdnsproxy1", "on",
            "--rtcuseutc", "on",
            "--audio", "none",
            "--paravirtprovider", "kvm"
        ]
    end

    # network settings
    config.vm.network :private_network, ip: "192.168.50.35"
    config.ssh.forward_agent = true

    config.vm.synced_folder "./", "/var/www/ds-mi"

    # hosts settings 
    config.vm.provision :hostmanager
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true
    config.hostmanager.aliases = %w(ds-mi.vagrant)

    config.vm.provision "shell", path: "./vagrant/provision/once_as_root.sh"
    config.vm.provision "shell", path: "./vagrant/provision/always-as-root.sh", run: 'always'


end
